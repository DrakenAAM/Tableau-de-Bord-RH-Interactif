from rest_framework import serializers
from .models import*
from rest_framework_simplejwt.serializers import TokenObtainPairSerializer

class EmployerSerializer(serializers.ModelSerializer):
    class Meta:
        model = Employer
        fields = '__all__'

class EmbaucheSerializer(serializers.ModelSerializer):
    class Meta:
        model = Embauche
        fields = '__all__'

class DebaucheSerializer(serializers.ModelSerializer):
    class Meta:
        model = Debauche
        fields = '__all__'

class CustomTokenObtainPairSerializer(TokenObtainPairSerializer):
    @classmethod
    def get_token(cls, user):
        token = super().get_token(user)

        # Ajoutez les informations utilisateur au token
        token['username'] = user.username
        token['email'] = user.email
        token['is_staff'] = user.is_staff  # Exemple d'ajout de rôle

        return token