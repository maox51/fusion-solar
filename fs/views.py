from django.utils import timezone
from collections import defaultdict
from django.contrib.auth import authenticate, login, logout
from django.contrib.auth.decorators import login_required
from django.db import IntegrityError
from django.http import JsonResponse
from django.shortcuts import HttpResponse, HttpResponseRedirect, get_object_or_404, render
from django.urls import reverse
from django.views.decorators.csrf import csrf_exempt
from django.contrib.auth.decorators import login_required

import json
from .models import *

def testedevista(request, salvavidas_id):
    # Procesar el número recibido
    numero = salvavidas_id
    
    # Redirigir al index pasando el número como parámetro en la URL
    return HttpResponseRedirect(f"{reverse('index')}?numero={numero}")

def index(request):

    # Authenticated users view their inbox
    if request.user.is_authenticated:
        numero = request.GET.get('numero', None)
        return render(request, "fs/index.html", {"numero": numero})

    # Everyone else is prompted to sign in
    else:
        return HttpResponseRedirect(reverse("login"))

@login_required
def inventariop(request):
    try:
        data = detalleproveedor.objects.all()
        data = data.order_by('-fecha')
        data = [products.serialize() for products in data]
        return JsonResponse(data, safe=False)
    except Exception as e:
            return JsonResponse({"error": str(e)}, status=400)

@login_required
def historyventa(request):
    try:
        # Obtener todos los detalles de ventas
        detalles = detalleventa.objects.select_related('venta', 'producto').all().order_by('id')

        # Crear un diccionario para agrupar los productos por venta
        ventas_agrupadas = defaultdict(lambda: {
            "venta_id": None,
            "fecha": None,
            "cliente": None,
            "empleado": None,
            "totalapagar": None,
            "metododepago": None,
            "direccion": None,
            "instalacion": None,
            "productos": []
        })

        for detalle in detalles:
            venta = detalle.venta
            producto = detalle.producto

            # Si no se ha añadido esta venta al diccionario, inicializamos sus datos
            if ventas_agrupadas[venta.id]["venta_id"] is None:
                ventas_agrupadas[venta.id].update({
                    "venta_id": venta.id,
                    "fecha": venta.fecha.strftime('%Y-%m-%d %H:%M:%S'),
                    "cliente": f"{venta.cliente.nombre} {venta.cliente.apellido}",
                    "empleado": venta.empleado.username,
                    "totalapagar": venta.totalapagar,
                    "metododepago": venta.metododepago,
                    "direccion": venta.direccion,
                    "instalacion": venta.instalacion,
                })

            # Añadir el producto a la lista de productos de la venta
            ventas_agrupadas[venta.id]["productos"].append({
                "nombre": producto.nombre,
                "cantidad": detalle.cantidadporproducto,
            })

        # Convertir a lista para enviar como JSON
        data = list(ventas_agrupadas.values())
        return JsonResponse(data, safe=False)

    except Exception as e:
        return JsonResponse({"error": str(e)}, status=400)

def getprovandbodega(request):
    try:
        dataprov = proveedor.objects.all()
        dataprov = dataprov.order_by('id')
        dataprov = [proveedor.serialize() for proveedor in dataprov]
        
        databod = bodega.objects.all()
        databod = databod.order_by('id')        
        databod = [bodega.serialize() for bodega in databod]
        
        respuesta = {
            "proveedores": dataprov,
            "bodegas": databod
        }
        return JsonResponse(respuesta, safe=False)
    except Exception as e:
            return JsonResponse({"error": str(e)}, status=400)

@csrf_exempt
@login_required
def addventa(request):
    if request.method == "POST":
        try:
            # Obtener datos del cliente
            datos_cliente = json.loads(request.body).get("cliente")
            cedula = datos_cliente.get("cedula")
            nombre = datos_cliente.get("nombre")
            apellido = datos_cliente.get("apellido")
            telefono = datos_cliente.get("telefono")

            # Crear o obtener cliente existente
            cliente_obj, created = cliente.objects.get_or_create(
                cedula=cedula,
                defaults={
                    "nombre": nombre,
                    "apellido": apellido,
                    "telefono": telefono,
                },
            )

            # Datos de la venta
            datos_venta = json.loads(request.body).get("venta")
            #empleado_id = datos_venta.get("empleado")
            metododepago = datos_venta.get("metododepago")
            totalapagar = datos_venta.get("totalapagar")
            instalacion = datos_venta.get("instalacion")
            direccion = datos_venta.get("direccion")

            # Verificar que el empleado exista
            #empleado_obj = empleado.objects.get(id=empleado_id)

            # Crear la venta
            venta_obj = venta.objects.create(
                cliente=cliente_obj,
                empleado=request.user,
                totalapagar=float(totalapagar),
                metododepago=metododepago,
                instalacion=bool(instalacion),
                direccion=direccion
            )

            # Obtener productos
            productos = datos_venta.get("productos")  # Lista de productos con cantidad
            for prod in productos:
                producto_id = prod.get("producto_id")
                cantidad = prod.get("cantidad")

                # Verificar que el producto exista
                producto_obj = producto.objects.get(id=producto_id)

                # Crear el detalle de la venta
                detalleventa.objects.create(
                    venta=venta_obj,
                    producto=producto_obj,
                    cantidadporproducto=int(cantidad),
                )

                # Actualizar la cantidad disponible del producto
                producto_obj.cantidad -= int(cantidad)
                producto_obj.fechadeactualizacion = timezone.now() 
                producto_obj.save()

            return JsonResponse({"message": "Venta registrada exitosamente"}, status=201)

        except Exception as e:
            return JsonResponse({"error": str(e)}, status=400)

    return JsonResponse({"error": "Método no permitido"}, status=405)

@csrf_exempt
@login_required
def addproveedor(request):
    if request.method == "POST":
        try:
            # Obtener datos del proveedor
            datos_proveedor = json.loads(request.body)
            if not request.body:
                return JsonResponse({"error": "No se recibieron datos"}, status=400)

            cedula = datos_proveedor.get("cedula")
            nombre = datos_proveedor.get("nombre")
            apellido = datos_proveedor.get("apellido")
            telefono = datos_proveedor.get("telefono")

            # Crear o obtener proveedor existente
            proveedor_obj, created = proveedor.objects.get_or_create(
                cedula=cedula,
                defaults={
                    "nombre": nombre,
                    "apellido": apellido,
                    "telefono": telefono,
                },
            )
            return JsonResponse({"mensaje": "Proveedor registrado exitosamente"}, status=201)
        except Exception as e:
            return JsonResponse({"error": str(e)}, status=400)
    else:
        return JsonResponse({"error": "Método no permitido"}, status=405)

@csrf_exempt
@login_required
def editar_proveedor(request, proveedor_id):
    if request.method == "PUT":
        try:
            sproveedor = proveedor.objects.get(id=proveedor_id)

            # Parsear los datos enviados en el cuerpo de la solicitud
            datos = json.loads(request.body)
            nombre = datos.get("nombre", sproveedor.nombre)
            apellido = datos.get("apellido", sproveedor.apellido)
            cedula = datos.get("cedula", sproveedor.cedula)
            telefono = datos.get("telefono", sproveedor.telefono)

            # Actualizar los datos de la bodega
            sproveedor.nombre = nombre
            sproveedor.apellido = apellido
            sproveedor.cedula = cedula
            sproveedor.telefono = telefono
            sproveedor.save()
            
            return JsonResponse({"mensaje": "Proveedor actualizada exitosamente"}, status=200)
        
        except Exception as e:
            return JsonResponse({"error": str(e)}, status=400)
        
    elif request.method == "DELETE":
        try:
            # Obtener el proveedor específico
            sproveedor = get_object_or_404(proveedor, id=proveedor_id)
            
            # Eliminar el proveedor
            sproveedor.delete()
            return JsonResponse({"message": "Proveedor eliminado exitosamente"}, status=200)
        except Exception as e:
            return JsonResponse({"error": str(e)}, status=400)
    else:
        return JsonResponse({"error": "Método no permitido"}, status=405)


@csrf_exempt
@login_required
def addbodega(request):
    if request.method == "POST":
        try:
            # Obtener datos del proveedor
            datos_bodega = json.loads(request.body)
            nombre = datos_bodega.get("nombre")
            capacidad = datos_bodega.get("capacidad")
            estado = True

            # Crear o obtener proveedor existente
            bodega_obj, created = bodega.objects.get_or_create(
                nombre=nombre,
                capacidad=capacidad,
                defaults={
                    "capacidad": capacidad,
                    "estado": estado,
                },
            )
            
            return JsonResponse({"mensaje": "Bodega actualizada exitosamente"}, status=200)
        
        except Exception as e:
            return JsonResponse({"error": str(e)}, status=400)
    else:
        return JsonResponse({"error": "Método no permitido"}, status=405)

@csrf_exempt
@login_required
def editar_bodega(request, bodega_id):
    if request.method == "PUT":
        try:
            # Obtener la bodega que se desea editar
            sbodega = bodega.objects.get(id=bodega_id)

            # Parsear los datos enviados en el cuerpo de la solicitud
            datos = json.loads(request.body)
            nombre = datos.get("nombre", sbodega.nombre)
            capacidad = datos.get("capacidad", sbodega.capacidad)

            # Actualizar los datos de la bodega
            sbodega.nombre = nombre
            sbodega.capacidad = capacidad
            sbodega.save()

            return JsonResponse({"mensaje": "Bodega actualizada exitosamente"}, status=200)
        except sbodega.DoesNotExist:
            return JsonResponse({"error": "Bodega no encontrada"}, status=404)
        except Exception as e:
            return JsonResponse({"error": str(e)}, status=400)
        
    elif request.method == "DELETE":
        try:
            # Obtener la bodega que se desea eliminar
            sbodega = bodega.objects.get(id=bodega_id)

            # Eliminar la bodega
            sbodega.delete()

            return JsonResponse({"mensaje": "Bodega eliminada exitosamente"}, status=200)
        except sbodega.DoesNotExist:
            return JsonResponse({"error": "Bodega no encontrada"}, status=404)
        except Exception as e:
            return JsonResponse({"error": str(e)}, status=400)
    else:
        return JsonResponse({"error": "Método no permitido"}, status=405)

@csrf_exempt
@login_required
def addproducto(request):
    if request.method == "POST":
        try:
            data = json.loads(request.body)

            nombre_marca = data.get("nombre_marca")
            modelo_marca = data.get("modelo_marca")

            if not nombre_marca or not modelo_marca:
                return JsonResponse({"error": "Faltan datos de la marca"}, status=400)

            marca_obj, _ = marca.objects.get_or_create(
                nombre=nombre_marca,
                modelo=modelo_marca
            )

            nombre_producto = data.get("nombre_producto")
            preciounitario = data.get("preciounitario")
            ganancia = data.get("ganancia")
            iva = data.get("iva")
            descripcion = data.get("descripcion")
            cantidad = data.get("cantidad")
            id_bodega = data.get("id_bodega")

            if not all([nombre_producto, preciounitario, ganancia, iva, descripcion, cantidad, id_bodega]):
                return JsonResponse({"error": "Faltan datos del producto"}, status=400)

            bodega_obj = get_object_or_404(bodega, id=id_bodega)

            producto_obj = producto.objects.create(
                nombre=nombre_producto,
                marca=marca_obj,
                preciounitario=preciounitario,
                ganancia=ganancia,
                iva=iva,
                descripcion=descripcion,
                cantidad=cantidad,
                codigobodega=bodega_obj
            )

            id_proveedor = data.get("id_proveedor")
            proveedor_obj = get_object_or_404(proveedor, id=id_proveedor)

            detalleproveedor.objects.create(
                proveedor=proveedor_obj,
                producto=producto_obj
            )

            return JsonResponse({"message": "Producto registrado exitosamente"}, status=201)

        except Exception as e:
            return JsonResponse({"error": str(e)}, status=400)
    else:
        return JsonResponse({"error": "Método no permitido"}, status=405)

@csrf_exempt
@login_required
def editar_producto(request, producto_id):
    if request.method == "PUT":
        try:
            producto_obj = producto.objects.get(id=producto_id)

            datos_actualizados = json.loads(request.body)
            producto_obj.nombre = datos_actualizados.get("nombre", producto_obj.nombre)
            producto_obj.preciounitario = datos_actualizados.get("preciounitario", producto_obj.preciounitario)
            producto_obj.ganancia = datos_actualizados.get("ganancia", producto_obj.ganancia)
            producto_obj.iva = datos_actualizados.get("iva", producto_obj.iva)
            producto_obj.descripcion = datos_actualizados.get("descripcion", producto_obj.descripcion)
            producto_obj.cantidad = datos_actualizados.get("cantidad", producto_obj.cantidad)

            if "codigobodega" in datos_actualizados:
                bodega_obj = bodega.objects.get(id=datos_actualizados["codigobodega"])
                producto_obj.codigobodega = bodega_obj

            if "proveedor" in datos_actualizados:
                proveedor_obj = proveedor.objects.get(id=datos_actualizados["proveedor"])
                detalleproveedor.objects.filter(producto=producto_obj).update(proveedor=proveedor_obj)

            producto_obj.save()

            return JsonResponse({"mensaje": "Producto actualizado exitosamente"}, status=200)
        except producto.DoesNotExist:
            return JsonResponse({"error": "Producto no encontrado"}, status=404)
        except bodega.DoesNotExist:
            return JsonResponse({"error": "Bodega no encontrada"}, status=404)
        except proveedor.DoesNotExist:
            return JsonResponse({"error": "Proveedor no encontrado"}, status=404)
        except Exception as e:
            return JsonResponse({"error": f"Error al editar el producto: {str(e)}"}, status=400)
    elif request.method == "DELETE":
        try:
            producto_obj = producto.objects.get(id=producto_id)
            producto_obj.delete()
            return JsonResponse({"mensaje": "Producto eliminado exitosamente"}, status=200)
        except producto.DoesNotExist:
            return JsonResponse({"error": "Producto no encontrado"}, status=404)
        except Exception as e:
            return JsonResponse({"error": f"Error al eliminar el producto: {str(e)}"}, status=400)
    else:    
        return JsonResponse({"error": "Método no permitido"}, status=405)

def login_view(request):
    
    if request.method == "POST":

        # Attempt to sign user in
        username = request.POST["username"]
        password = request.POST["password"]
        user = authenticate(request, username=username, password=password)

        # Check if authentication successful
        if user is not None:
            login(request, user)
            return HttpResponseRedirect(reverse("index"))
        else:
            return render(request, "fs/login.html", {
                "message": "Invalid email and/or password."
            })
    else:
        return render(request, "fs/login.html")


def logout_view(request):
    logout(request)
    return HttpResponseRedirect(reverse("index"))


def register(request):
    if request.method == "POST":
        username = request.POST["username"]

        # Ensure password matches confirmation
        password = request.POST["password"]
        confirmation = request.POST["confirmation"]
        if password != confirmation:
            return render(request, "fs/register.html", {
                "message": "Passwords must match."
            })

        # Attempt to create new user
        try:
            user = User.objects.create_user(username, '', password)
            user.save()
        except IntegrityError as e:
            print(e)
            return render(request, "fs/register.html", {
                "message": "username address already taken."
            })
        login(request, user)
        return HttpResponseRedirect(reverse("index"))
    else:
        return render(request, "fs/register.html")
