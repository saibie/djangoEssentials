"""
ASGI config for source project.

It exposes the ASGI callable as a module-level variable named ``application``.

For more information on this file, see
https://docs.djangoproject.com/en/5.0/howto/deployment/asgi/
"""

import os

from django.core.asgi import get_asgi_application

# Added for WebScoket -------------------------------------
from channels.routing import ProtocolTypeRouter, URLRouter
from channels.auth import AuthMiddlewareStack
import source.websocket.routing
# ---------------------------------------------------------

os.environ.setdefault("DJANGO_SETTINGS_MODULE", "source.settings")

# application = get_asgi_application()     # Default settings

# Changed for WebSocket -----------------------------------
application = ProtocolTypeRouter(
    {
        'http': get_asgi_application(),
        'websocket': AuthMiddlewareStack(
            URLRouter([
                source.websocket.routing.websocket_urlpatterns
            ])
        ), 
    }
)
# ---------------------------------------------------------
