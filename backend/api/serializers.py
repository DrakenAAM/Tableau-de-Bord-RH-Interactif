from rest_framework import serializers
from .models import*

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