from django.db import models
from django.contrib.auth.models import User

# Create your models here.
class Employer(models.Model):
    matricule = models.IntegerField(primary_key=True)
    trigramme = models.CharField(max_length=4)
    sexe = models.CharField(max_length=10)
    embauche = models.DateField()
    contrat = models.CharField(max_length=10)
    naissance = models.DateField()
    age = models.IntegerField()
    direction = models.CharField(max_length=10)
    classification = models.CharField(max_length=10)
    metier = models.CharField(max_length=100)
    ville = models.CharField(max_length=80)
    entite = models.CharField(max_length=10)

    def __str__(self):
        return f"{self.matricule} - {self.trigramme}"

class Embauche(models.Model):
    matricule = models.IntegerField(primary_key=True)
    trigramme = models.CharField(max_length=4)
    sexe = models.CharField(max_length=10)
    embauche = models.DateField()
    contrat = models.CharField(max_length=10)
    naissance = models.DateField()
    age = models.IntegerField()
    direction = models.CharField(max_length=10)
    classification = models.CharField(max_length=10)
    metier = models.CharField(max_length=100)
    ville = models.CharField(max_length=80)
    entite = models.CharField(max_length=10)
    observation = models.CharField(max_length=50)

    def __str__(self):
        return f"{self.matricule} - {self.trigramme}"

class Debauche(models.Model):
    matricule = models.IntegerField(primary_key=True)
    trigramme = models.CharField(max_length=4)
    sexe = models.CharField(max_length=10)
    embauche = models.DateField()
    contrat = models.CharField(max_length=10)
    naissance = models.DateField()
    age = models.IntegerField()
    direction = models.CharField(max_length=10)
    classification = models.CharField(max_length=10)
    metier = models.CharField(max_length=100)
    ville = models.CharField(max_length=80)
    entite = models.CharField(max_length=10)
    date_debauche = models.DateField()
    motif = models.CharField(max_length=80)

    def __str__(self):
        return f"{self.matricule} - {self.trigramme}"
    
class ImportHistory(models.Model):
    file_name = models.CharField(max_length=255)  # Nom du fichier importé
    import_type = models.CharField(max_length=50)  # Type de données : Employer, Embauche, Débauche
    imported_by = models.ForeignKey(User, on_delete=models.SET_NULL, null=True, blank=True)
    import_date = models.DateTimeField(auto_now_add=True)  # Date d'importation
    success = models.BooleanField(default=True) # Indique si l'importation a réussi

    def __str__(self):
        return f"{self.import_type} - {self.file_name} by {self.imported_by.username}"

