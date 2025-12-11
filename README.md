# CRISTAL  
### **C**ontrôle et **R**éconciliation des **I**nformations **S**cannées et **T**raitement des **A**nnotations **L**om 
Parser & Réconciliateur des lectures optiques Axiome AXM980

---

## 📌 Description du projet

CRISTAL est un outil de traitement automatique destiné à analyser, valider, comparer et réconcilier les données issues des lectures optiques effectuées au moyen du scanner **Axiome AXM980** utilisé par le SMART – Université de Liège (ULiège), et implémenté à la **Haute École Pédagogique du canton de Vaud (HEP Vaud)**.

Ce parser automatise l’intégralité du pipeline décrit dans le protocole officiel SMART :

- la lecture des fichiers **A** (référence) et **V** (vérification),
- la détection et la correction d’erreurs de lecture,
- la vérification des matricules et des formes,
- la comparaison entrée par entrée,
- la production d’un **fichier final de données réconciliées** conforme aux spécifications SMART,
- la validation du fichier signalétique et du fichier des adresses e-mail,
- la production du **fichier de paramétrage électronique**.

CRISTAL vise à **sécuriser la correction**, automatiser les contrôles, réduire les erreurs humaines et fluidifier le flux opératoire de correction des QCM.


---

## ➡️ Processus de correction
![alt text](documentation/processus.png "Title")



---

## 📄 Types de formulaires gérés

CRISTAL peut traiter les trois types de formuLOMs utilisés à la HEP Vaud :

- **QCM102** – 102 questions, 5 options (+ Aucune / Toutes)  
  - Fichiers papier : `QCM5AT_102Q.pdf` ou `QCM9_102Q.pdf`
  - Programmes lecteur optique : `VD102_A.AUR`, `VD102_V.AUR`

- **QCMDC30** – 30 questions avec Degrés de Certitude (DC)  
  - Fichier papier : `QCMDC5A_30Q.pdf`
  - Programmes lecteur optique : `VD30_A.AUR`, `VD30_V.A.AUR`

---

## 📂 Fichiers d’entrée

### 1. Fichiers de lecture optique

Générés par le lecteur Axiome :

- `lecture_A.txt` – lecture de référence (intensité 4)
- `lecture_V.txt` – lecture de vérification (intensité 3)

Chaque ligne représente une feuille scannée.

CRISTAL vérifie :

- la cohérence du nombre de feuilles,
- les données manquantes (`.`),
- les erreurs de lecture (`?`),
- les matricules invalides,
- les formes incohérentes.

---

### 2. Fichier signalétique

CSV UTF-8 contenant : matricule, nom, prénom, section, année académique…  
Tous les étudiants figurant dans le fichier final doivent s'y trouver.

### 3. Fichier des adresses e-mail

CSV UTF-8 sans ligne d’en-tête :


### 4. Paramètres de l’épreuve

Le fichier de paramétrage électronique est généré automatiquement par CRISTAL, mais peut être rempli depuis un template.

---

## 🔎 Fonctionnement interne

CRISTAL applique le protocole de vérification SMART.

### 1. Vérification des matricules

- doivent contenir 6 caractères numériques,
- doivent commencer par `0`,
- corrections automatiques pour les feuilles de vérification :  
  - Forme A → `999996`  
  - Forme B → `999997`  
  - Forme C → `999998`  
  - Forme D → `999999`

---

### 2. Vérification des formes

Formes possibles :

- A = 1  
- B = 2  
- C = 3  
- D = 4  

Si une seule forme est utilisée : toutes les valeurs = 1.

---

### 3. Réconciliation des réponses

Pour chaque question :

| Lecture A | Lecture V | Action |
|----------|-----------|--------|
| identiques et numériques | identiques | conserver |
| `.` | `.` | remplacer par `0` |
| `?` | `?` | inspection de la feuille papier |
| A ≠ V | | inspection et choix manuel ou `0` |

Même logique pour les **Degrés de Certitude (DC)** si présents.

---

### 4. Gestion des numéros de feuille

CRISTAL vérifie que :

- les numéros de feuilles A et V correspondent,
- la dernière feuille lue est identique,
- aucune feuille n’est manquante ou doublée.

---

## 📝 Fichiers produits

### 1. Fichier final de données réconciliées (TXT)

Caractéristiques :

- ASCII numérique uniquement,
- lignes terminées par `LF`,
- champs séparés par un espace.

Structure :

1. matricule  
2. forme  
3. numéro de feuille  
4. vecteur des réponses  
5. vecteur des DC (si applicable)

---

### 2. Fichier de paramétrage électronique (CSV)

Contient notamment :

- forme,
- nom enseignant,
- cours,
- groupe,
- date de l’épreuve,
- nombre de questions,
- vectorisation des solutions,
- NSP, CP, chapitres,
- nombre de formes,
- positions mélangées (formes B/C/D).

Format strict, conforme aux spécifications SMART.

---

## 🚀 Workflow CRISTAL

1. Charger les fichiers A et V  
2. Charger les fichiers signalétique et e-mails  
3. Vérifier la cohérence des entrées  
4. Nettoyer et corriger matricules et formes  
5. Comparer lecture A et lecture V  
6. Réconcilier les données  
7. Générer :
   - fichier final TXT,
   - fichier de paramétrage CSV  
8. (optionnel) Générer un rapport d’audit

---