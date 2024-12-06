from django.urls import path
from .views import*

urlpatterns=[
    path('upload_employers/', ImportDataEmployer.as_view(), name='file-employer-upload'),
    path('employers/', EmployerListView.as_view(), name='employer-list'),
    path('upload_embauches/', ImportDataEmbauche.as_view(), name='file-embauche-upload' ),
    path('embauches/', EmbaucheListView.as_view(), name='embauche-list'),
    path('upload_debauches/', ImportDataDebauche.as_view(), name='file-debauche-upload'),
    path('debauches/', DebaucheListView.as_view(), name='debauche-list'),
    path('effectifs/', TotalsEffectifView.as_view(), name="effectifs"),
    path('repartition/', RepartionSexe.as_view(), name="Repartition-sexe"),
    path('register/', RegisterView.as_view(), name='register'),
    path('login/', LoginView.as_view(), name='login'),
    path('users/', UserListView.as_view(), name='user-list'),
    path('users/<int:user_id>/', UserListView.as_view(), name='user-detail'),
    path('history/', ImportHistoryView.as_view(), name='import_history'),
]