from django.db import models

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
    
    """class historique_importation(models.Model):
        STATUT_CHOICES =[
            ('SUCCES', 'Succès'),
            ('ECHEC', 'Echec')
        ]

        date_importation = models.DateTimeField(auto_now_add=True)
        utilisateur = models.ForeignKey(User), null=True, on_delete=models.SET_NULL)
        fichier_nom = models.CharField(max_length=100)
        statut = models.CharField(max_length=10, choices=STATUS_CHOICES)
        message_erreur = models.TextField(blank=True, null=True)
        nb_saved_add = models.IntegerField(default=0)
        nb_saved_edit = models.IntegerField(default=0)
        duree_importation = models.DurationField(blank=True, null=True)

        def __str__(self):
            return f"Importation du {self.date_importation} - Statut : {self.statut}"""
