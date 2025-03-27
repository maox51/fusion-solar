from django.contrib.auth.models import AbstractUser
from django.db import models


class User(AbstractUser):
    pass

class marca(models.Model):
    nombre = models.CharField(max_length=50)
    modelo = models.CharField(max_length=50)
    
    def __str__(self):
        return self.modelo
    
class cliente(models.Model):
    cedula = models.CharField(max_length=50)
    nombre = models.CharField(max_length=50)
    apellido = models.CharField(max_length=50)
    telefono = models.CharField(max_length=50)
    
    def __str__(self):
        return self.nombre

class empleado(models.Model):
    nombre = models.CharField(max_length=50)
    apellido = models.CharField(max_length=50)
    telefono = models.CharField(max_length=50)
    cargo = models.CharField(max_length=50)
    
    def __str__(self):
        return self.nombre

class bodega(models.Model):
    nombre = models.CharField(max_length=50)
    estado = models.BooleanField()
    capacidad = models.IntegerField(default=0) 
    idempleado = models.ForeignKey(empleado, on_delete=models.CASCADE, blank=True, null=True)
    
    def serialize(self):
        return{
            "nombre":self.nombre,
            "estado":  self.estado,
            "capacidad":self.capacidad,
            "id": self.id,
        }

    def __str__(self):
        return self.nombre

class producto(models.Model):
    nombre = models.CharField(max_length=50)
    marca = models.ForeignKey(marca, on_delete=models.CASCADE)
    preciounitario = models.FloatField()
    ganancia = models.FloatField()
    iva = models.FloatField()
    codigobodega = models.ForeignKey(bodega, on_delete=models.CASCADE)
    descripcion = models.CharField(max_length=200)
    cantidad = models.IntegerField(default=0)
    fechadeactualizacion = models.DateTimeField(auto_now_add=True, null=True, blank=True)
    
    def __str__(self):
        return self.nombre
    
class venta(models.Model):
    fecha = models.DateTimeField(auto_now_add=True)
    cliente = models.ForeignKey(cliente, on_delete=models.CASCADE)
    empleado = models.ForeignKey(User, on_delete=models.CASCADE)
    totalapagar = models.FloatField()
    metododepago = models.CharField(max_length=50)
    instalacion = models.BooleanField(default=False)
    direccion = models.CharField(max_length=300, default="")
    precioinstalacion = models.FloatField(default=0)
    
    def __str__(self):
        return f"Venta {self.id} - Cliente: {self.cliente.nombre}"
    
    
class detalleventa(models.Model):
    venta = models.ForeignKey(venta, on_delete=models.CASCADE)
    producto = models.ForeignKey(producto, on_delete=models.CASCADE)
    cantidadporproducto = models.IntegerField(default=1)
    
    def serialize(self):
        return {
            "nventa": self.venta.id,
            "cliente": self.venta.cliente.nombre,
            "empleado": self.venta.empleado.username,
            "pago": self.venta.totalapagar,
            "metododepago": self.venta.metododepago,
            "producto": self.producto.nombre,
            "instalacion": self.venta.instalacion,
            "direccion": self.venta.direccion,
            "fecha": self.venta.fecha.strftime("%b %d %Y, %I:%M %p")
        }
    
    def __str__(self):
        return f"Detalle Venta {self.venta.id} - Producto: {self.producto.nombre} - Cantidad: {self.cantidadporproducto}"

class proveedor(models.Model):
    cedula = models.CharField(max_length=50)
    nombre = models.CharField(max_length=50)
    apellido = models.CharField(max_length=50)
    telefono = models.CharField(max_length=50)
    
    def serialize(self):
        return{
            "nombre":self.nombre,
            "apellido":self.apellido,
            "telefono":self.telefono,
            "cedula":self.cedula,
            "id": self.id,
        }
    
    def __str__(self):
        return self.nombre
    
class detalleproveedor(models.Model):
    proveedor = models.ForeignKey(proveedor, on_delete=models.CASCADE)
    producto = models.ForeignKey(producto, on_delete=models.CASCADE)
    fecha = models.DateTimeField(auto_now_add=True)
    
    def serialize(self):
        return {
            "id": self.producto.id,
            "nombre": self.producto.nombre,
            "proveedor": self.proveedor.nombre,
            "marca": self.producto.marca.nombre,
            "modelo": self.producto.marca.modelo,
            "preciounitario": self.producto.preciounitario,
            "ganancia": self.producto.ganancia,
            "iva": self.producto.iva,
            "codigobodega": self.producto.codigobodega.nombre,
            "cantidad": self.producto.cantidad,
            "descripcion": self.producto.descripcion,
            "fechadeactualizacion": self.producto.fechadeactualizacion.strftime("%b %d %Y, %I:%M %p")
        }  
    
    
    def __str__(self):
        return self.producto.nombre