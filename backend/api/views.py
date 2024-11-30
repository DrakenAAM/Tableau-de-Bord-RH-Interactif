from django.shortcuts import render
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status
from .serializers import*
from .models import*
import csv
import datetime
from django.http import JsonResponse
from rest_framework.permissions import AllowAny
from django.contrib.auth.models import User
from rest_framework_simplejwt.tokens import RefreshToken

#importation des données employer
class ImportDataEmployer(APIView):
    def convertir_date(date_str):
        return datetime.datetime.strptime(date_str, "%d/%m/%Y").strftime("%Y-%m-%d")
        
    def post(self, request, *args, **kwargs):
        file = request.FILES.get('file')
        print("Fichier reçu")
        if not file:
            print("Erreur: Aucun fichier reçu")
            return Response({"error": "Le fichier n'a pas été impotré"}, status=status.HTTP_400_BAD_REQUEST)

        try:
            print("Lecture du fichier CSV")
            content = file.read().decode('utf-8-sig')
            csv_file = csv.reader(content.splitlines(), delimiter=';')
            nombre_col = 12

            for row in csv_file:
                print("Ligne lue :", row)

                if not row or len(row) != nombre_col:
                    print("Erreur : Format de ligne invalide")
                    #return Response({"error": "Format invalide"}, status=status.HTTP_400_BAD_REQUEST)
                    continue

                matricule, trigramme, sexe, embauche, contrat, naissance, age, direction, classification, metier, ville, entite = row[0].strip(), row[1].strip(), row[2].strip(), row[3].strip(), row[4].strip(), row[5].strip(), row[6].strip(), row[7].strip(),row[8].strip(), row[9].strip(), row[10].strip(), row[11].strip()

                try:
                    matricule= int(matricule)
                except ValueError:
                    print("Erreur : Age non valide", row)
                    return Response({"error": "L'age doit etre un entier {row}"}, status=status.HTTP_400_BAD_REQUEST)
                
                embauche = ImportDataEmployer.convertir_date(embauche)
                naissance = ImportDataEmployer.convertir_date(naissance)

                if Employer.objects.filter(matricule=matricule).exists():
                    print(f"Doublon trouvé pour la matricule {matricule}, enregistrement ignoré.")
                    continue
                    
                employer =  Employer(
                    matricule=matricule,
                    trigramme=trigramme,
                    sexe=sexe, 
                    embauche=embauche, 
                    contrat=contrat, 
                    naissance=naissance, 
                    age=age, 
                    direction=direction, 
                    classification=classification, 
                    metier=metier, 
                    ville=ville, 
                    entite=entite
                     )
                employer.save()
                print(f"Data employer sauvegardée : {matricule}, {trigramme}")
            return Response({"message": "Fichier traité avec succees"}, status=status.HTTP_201_CREATED)

        except IndexError:
            print("Erreur : Format du fichier incorrect")
            return Response({"error": "Format du fichier est incorrecte"}, status=status.HTTP_400_BAD_REQUEST)
        except Exception as e:
            print("Erreur inattendub :", str(e))
            return Response({"error": str(e)}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)

#Affiche liste Employer
class EmployerListView(APIView):
    def get(self, request, *args, **kwargs):
        print("Requete GET reçue")
        employers = Employer.objects.all()
        serializer = EmployerSerializer(employers, many=True)
        return Response(serializer.data)

#Importation des données debauche
class ImportDataEmbauche(APIView):
    def convertir_date(date_str):
        return datetime.datetime.strptime(date_str, "%d/%m/%Y").strftime("%Y-%m-%d")
        
    def post(self, request, *args, **kwargs):
        file = request.FILES.get('file')
        print("Fichier reçu")
        if not file:
            print("Erreur: Aucun fichier reçu")
            return Response({"error": "Le fichier n'a pas été impotré"}, status=status.HTTP_400_BAD_REQUEST)

        try:
            print("Lecture du fichier CSV")
            content = file.read().decode('utf-8-sig')
            csv_file = csv.reader(content.splitlines(), delimiter=';')
            nombre_col = 13

            for row in csv_file:
                print("Ligne lue :", row)

                if not row or len(row) != nombre_col:
                    print("Erreur : Format de ligne invalide")
                    #return Response({"error": "Format invalide"}, status=status.HTTP_400_BAD_REQUEST)
                    continue

                matricule, trigramme, sexe, embauche, contrat, naissance, age, direction, classification, metier, ville, entite, observation = row[0].strip(), row[1].strip(), row[2].strip(), row[3].strip(), row[4].strip(), row[5].strip(), row[6].strip(), row[7].strip(),row[8].strip(), row[9].strip(), row[10].strip(), row[11].strip(), row[12].strip()

                try:
                    matricule= int(matricule)
                except ValueError:
                    print("Erreur : Age non valide", row)
                    return Response({"error": "L'age doit etre un entier {row}"}, status=status.HTTP_400_BAD_REQUEST)
                
                embauche = ImportDataEmbauche.convertir_date(embauche)
                naissance = ImportDataEmbauche.convertir_date(naissance)

                if Embauche.objects.filter(matricule=matricule).exists():
                    print(f"Doublon trouvé pour la matricule {matricule}, enregistrement ignoré.")
                    continue

                embauche =  Embauche(
                    matricule=matricule, 
                    trigramme=trigramme, 
                    sexe=sexe, 
                    embauche=embauche, 
                    contrat=contrat, 
                    naissance=naissance, 
                    age=age, 
                    direction=direction, 
                    classification=classification, 
                    metier=metier, 
                    ville=ville, 
                    entite=entite,
                    observation=observation
                    )
                embauche.save()
                print("Data employer sauvegardée : {matricule}, {trigramme}")
            return Response({"message": "Fichier traité avec succees"}, status=status.HTTP_201_CREATED)
        except IndexError:
            print("Erreur : Format du fichier incorrect")
            return Response({"error": "Format du fichier est incorrecte"}, status=status.HTTP_400_BAD_REQUEST)
        except Exception as e:
            print("Erreur inattendub :", str(e))
            return Response({"error": str(e)}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)

class EmbaucheListView(APIView):
    def get(self, request, *args, **kwargs):
        print("Requete GET reçue")
        embauches = Embauche.objects.all()
        serializer = EmbaucheSerializer(embauches, many=True)
        return Response(serializer.data)
#importation des données debauche
class ImportDataDebauche(APIView):
    def convertir_date(date_str):
        return datetime.datetime.strptime(date_str, "%d/%m/%Y").strftime("%Y-%m-%d")
        
    def post(self, request, *args, **kwargs):
        file = request.FILES.get('file')
        print("Fichier reçu")
        if not file:
            print("Erreur: Aucun fichier reçu")
            return Response({"error": "Le fichier n'a pas été impotré"}, status=status.HTTP_400_BAD_REQUEST)

        try:
            print("Lecture du fichier CSV")
            content = file.read().decode('utf-8-sig')
            csv_file = csv.reader(content.splitlines(), delimiter=';')
            nombre_col = 14

            """for i, row in enumerate(csv_file):
                print(f"ligne {i} : {row} ")
                if not row or len(row) != nombre_col:
                    print(f"Erreur : Ligne {i} n'a pas de bon nombre de colonne({len(row)} au lieu de {nombre_col})")
                    continue"""

            for row in csv_file:
                print("Ligne lue :", row)

                if not row or len(row) != nombre_col:
                    print("Erreur : Format de ligne invalide")
                    #return Response({"error": "Format invalide"}, status=status.HTTP_400_BAD_REQUEST)
                    continue

                matricule, trigramme, sexe, embauche, contrat, naissance, age, direction, classification, metier, ville, entite, date_debauche, motif = row[0].strip(), row[1].strip(), row[2].strip(), row[3].strip(), row[4].strip(), row[5].strip(), row[6].strip(), row[7].strip(),row[8].strip(), row[9].strip(), row[10].strip(), row[11].strip(), row[12].strip(), row[13].strip()
                try:
                    matricule= int(matricule)
                except ValueError:
                    print("Erreur : Age non valide", row)
                    return Response({"error": "L'age doit etre un entier {row}"}, status=status.HTTP_400_BAD_REQUEST)
                
                embauche = ImportDataDebauche.convertir_date(embauche)
                naissance = ImportDataDebauche.convertir_date(naissance)
                date_debauche = ImportDataDebauche.convertir_date(date_debauche)
                #employer_existe = Employer.objects.filter(matricule=matricule).exists()

                if Employer.objects.filter(matricule=matricule).exists():

                    Employer.objects.filter(matricule=matricule).delete()

                    debauche =  Debauche(
                        matricule=matricule, 
                        trigramme=trigramme, 
                        sexe=sexe, 
                        embauche=embauche, 
                        contrat=contrat, 
                        naissance=naissance, 
                        age=age, 
                        direction=direction, 
                        classification=classification, 
                        metier=metier, 
                        ville=ville, 
                        entite=entite,
                        date_debauche=date_debauche,
                        motif=motif
                        )
                    debauche.save()
                    print(f"Le matricule {matricule} a été transféré de Employer vers Debauche")
                else:
                    print(f"Le matricule {matricule} n'existe pas dans Employer, aucun action n'a été prise")
                
                print("Data debauche sauvegardée : {matricule}, {trigramme}")
            return Response({"message": "Fichier traité avec succees"}, status=status.HTTP_201_CREATED)
        except IndexError:
            print("Erreur : Format du fichier incorrect")
            return Response({"error": "Format du fichier est incorrecte"}, status=status.HTTP_400_BAD_REQUEST)
        except Exception as e:
            print("Erreur inattendub :", str(e))
            return Response({"error": str(e)}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)

class DebaucheListView(APIView):
    def get(self, request, *args, **kwargs):
        print("Requete GET reçue")
        debauches = Debauche.objects.all()
        serializer = DebaucheSerializer(debauches, many=True)
        return Response(serializer.data)
#Affiche total employés, embauches et débauches
class TotalsEffectifView(APIView):
    def get(self, request):
        total_employes = Employer.objects.count()
        total_embauches = Embauche.objects.count()
        total_debauches = Debauche.objects.count()
        print(f"Le totals de debauche est {total_debauches}")
        data = {
        "total_employes": total_employes,
        "total_embauches": total_embauches,
        "total_debauches": total_debauches,
        }
        return Response(data)
#graphe rapartition par sexe
class RepartionSexe(APIView):
    def get(self, request):
        total_employes = Employer.objects.count()
        hommes = Employer.objects.filter(sexe="Homme").count()
        femmes = Employer.objects.filter(sexe="Femme").count()

        #calcule pourcentage entre homme et femme
        
        pourcentage_hommes = (hommes / total_employes * 100) if total_employes > 0 else 0
        pourcentage_femmes = (femmes / total_employes * 100) if total_employes > 0 else 0
        print(f"La repartition {pourcentage_hommes} %")
        data = {
            "homme": pourcentage_hommes,
            "femme": pourcentage_femmes,
        }
        return Response(data)

# s'inscire
class RegisterView(APIView):
    permission_classes = [AllowAny]

    def post(self, request):
        username = request.data.get("username")
        password = request.data.get("password")

        if User.objects.filter(username=username).exists():
            return Response({"message": "Le nom d'utilisateur existe déjà"}, status=400)
        user = User.objects.create_user(username=username, password=password)
        return Response({"message": "Creation d'utilisateur est un succés"}, satus=201)
# Authentification
class LoginView(APIView):
    permision_classes = [AllowAny]

    def post(self, request):
        username = request.data.get("username")
        password = request.data.get("password")

        user = User.objects.filter(username=username).first()
        if user is None or not user.check_password(password):
            return Response ({"message": "Identificattion invalide"}, status=400)
        
        refresh = RefreshToken.for_user(user)
        return Response({
            "refresh": str(refresh),
            "access": str(refresh.access_token),
        })
  