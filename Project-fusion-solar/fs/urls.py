from django.urls import path

from . import views

urlpatterns = [
    path("", views.index, name="index"),
    #salvavidaas
    path('salvavidas/<int:salvavidas_id>', views.testedevista, name='salvavidas'),
    
    path("login", views.login_view, name="login"),
    path("logout", views.logout_view, name="logout"),
    path("register", views.register, name="register"),

    # API Routes
    
    #apis inventario
    path("productos", views.inventariop, name="inventariop"),
    path('addproducto', views.addproducto, name='addproducto'),
    path('editproductos/<int:producto_id>', views.editar_producto, name='edit_producto'),
    #apis ventas
    path("historyventa", views.historyventa, name="historyventa"),
    path("addventa", views.addventa, name="addventa"),
    #apis bodegas
    path("addbodega", views.addbodega, name="addbodega"),
    path('addbodega/<int:bodega_id>', views.editar_bodega, name='editar_bodega'),
    #apis proveedores
    path("getprovandbodega", views.getprovandbodega, name="getprovandbodega"),
    path("addproveedor", views.addproveedor, name="addproveedor"),
    path('addproveedor/<int:proveedor_id>', views.editar_proveedor, name='aditproveedor'),
    
]
