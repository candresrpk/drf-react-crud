from django.urls import path, include
from rest_framework import routers
from rest_framework.documentation import include_docs_urls
from .views import TaskView

router = routers.DefaultRouter()
router.register(r'tasks', TaskView, 'tasks')

urlpatterns = [
    path('', include(router.urls)),
    path('docs/', include_docs_urls(title='Tasks api'))
] 