from django.urls import include, path
from rest_framework.routers import DefaultRouter

from . import views

router = DefaultRouter(trailing_slash=False)
router.register('specifications/uom', views.UomViewSet)
router.register('specifications/method', views.MethodViewSet)
router.register('specifications/density', views.DensityViewSet)
router.register('specifications/solid-content', views.SolidContentViewSet)
router.register('specifications/ph', views.PhViewSet)
router.register('specifications/acid-meq', views.AcidMeqViewSet)
router.register('specifications/base-meq', views.BaseMeqViewSet)
router.register('specifications/solvent-content', views.SolventContentViewSet)
router.register('specifications/conductivity', views.ConductivityViewSet)
router.register('specifications/hegman-fineness', views.HegmanFinenessViewSet)
router.register('specifications/viscosity', views.ViscosityViewSet)
router.register('specifications/thickness', views.ThicknessViewSet)
router.register('specifications/gloss', views.GlossViewSet)
router.register('specifications/adhesion', views.AdhesionViewSet)
router.register('specifications/roughness', views.RoughnessViewSet)
router.register('specifications/resistivity', views.ResistivityViewSet)
router.register('specifications/hiding-power', views.HidingPowerViewSet)

urlpatterns = [
    path('', include(router.urls))
]
