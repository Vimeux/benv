---
title: 'Obtenir la source d''une vidéo'
excerpt: 'Comment obtenir la source d''une vidéo sur le web quand celle-ci n''est pas disponible en téléchargement ? C''est ce que nous allons voir dans cet article.'
coverImage: '/assets/blog/obtenir-source-video/cover.webp'
date: '2023-08-30T19:02:00.000Z'
author:
  name: 'Benjamin Vimeux'
  picture: '/assets/blog/authors/bv.webp'
ogImage:
  url: '/assets/blog/obtenir-source-video/cover.webp'
---

## 🚨 Disclaimer 🚨

Cet article est à but éducatif et ne doit pas être utilisé pour télécharger des vidéos protégées par des droits d'auteur.

### Introduction

Il arrive parfois que l'on souhaite télécharger une vidéo sur le web mais que celle-ci n'est pas disponible en téléchargement. 
Dans cet article, nous allons voir comment obtenir la source d'une vidéo sur le web quand celle-ci n'est pas disponible en téléchargement.
Je vais prendre comme exemple la vidéo suivante : https://fusevideo.io/e/Gdjr9rBLL58MWWJ
Elle est disponible sur le site neko-sama.fr mais n'est pas disponible en téléchargement.
L'objectif est de récupérer la source de la vidéo pour pouvoir la télécharger ou la lire sur un autre lecteur vidéo.
La méthode utilisée dans cet article est valable pour la plupart des sites web. Il convient de l'adapter en fonction du site web ciblé en trouvant le bon sélecteur CSS pour la vidéo ainsi que l'url du lecteur vidéo.

Pour ce faire, nous allons faire du scraping. Le scraping consiste à récupérer des données sur un site web en utilisant un programme informatique. Nous allons utiliser le langage Python et la librairie Selenium pour automatiser le scraping. On utilse Selenium car il permet de simuler un navigateur web et d'interagir avec celui-ci. Cela nous permettra d'analiser le trafic réseau et de récupérer la source de la vidéo.
Nous aurons besoin de Google Chrome et éventuellement, un bloqueur de publicité comme uBlock Origin.

## Étape 1 : Préparation de l'environnement

### Installation de Python

Pour commencer, il faut installer Python. Si vous êtes sous Windows, vous pouvez trouver les instructions d'installation sur le site officiel : https://docs.python.org/fr/3/using/index.html
Si vous êtes sous  Linux ou Mac, Python est déjà installé sur votre machine.

### Installation de Selenium

Ensuite, il faut installer Selenium. Pour cela, il faut ouvrir un terminal et taper la commande suivante :

```bash
pip install selenium
```

### Installation de Google Chrome

Enfin, il faut installer Google Chrome. Si vous êtes sous Windows, vous pouvez le télécharger sur le site officiel : https://www.google.com/intl/fr_fr/chrome/
Si vous êtes sous Linux ou Mac, vous pouvez l'installer avec votre gestionnaire de paquets.
Installer en plus uBlock Origin pour bloquer les publicités.

### Chromedriver

Pour pouvoir utiliser Selenium avec Google Chrome, il faut télécharger Chromedriver. Chromedriver est un programme qui permet de contrôler Google Chrome avec Selenium. Il faut télécharger la version correspondant à votre version de Google Chrome. Pour connaître votre version de Google Chrome, il faut aller dans les paramètres de Google Chrome puis dans la section "A propos de Google Chrome". Vous pouvez télécharger Chromedriver sur le site officiel : https://chromedriver.chromium.org/downloads

## Étape 2 : Configuration de l'environnement

### Préparation du projet

```Python
from time import sleep
from selenium import webdriver
from selenium.webdriver.chrome.options import Options
from selenium.webdriver.chrome.service import Service
from selenium.webdriver.common.by import By
from selenium.webdriver import DesiredCapabilities
import json
import base64

# Chemin vers l'extension uBlock Origin
adblock_path = 'chemin/vers/id/extension'

# Configuration des fonctionnalités de Google Chrome
capabilities = DesiredCapabilities.CHROME
capabilities['goog:loggingPrefs'] = {'performance': 'ALL'}

# Configuration de Google Chrome
options = Options()
options.headless = True
options.add_argument("--window-size=1920,1200")
options.add_argument('load-extension=' + adblock_path)

# Chemin vers Chromedriver
DRIVER_PATH = 'assets/chromedriver'
driver = webdriver.Chrome(options=options, service=Service(DRIVER_PATH), desired_capabilities=capabilities)
```

Nous commençons par importer les librairies dont nous aurons besoin. Nous importons également les fonctionnalités de Google Chrome pour pouvoir analyser le trafic réseau. Nous configurons ensuite Google Chrome pour qu'il soit lancé en mode headless (sans interface graphique) et avec uBlock Origin. Enfin, nous configurons Chromedriver pour qu'il puisse contrôler Google Chrome.

### Récupération de l'url de la vidéo

```Python
# Ouvrir la page
driver.get("https://fusevideo.io/e/Gdjr9rBLL58MWWJ")
# Lance la vidéo
driver.execute_script("document.querySelector('.jw-video').click()")
# Attendre que la vidéo se lance
sleep(1)
# Arrêter la vidéo
driver.execute_script("document.querySelector('.jw-video').click()")
# Récupérer les logs du trafic réseau
logs_raw = driver.get_log('performance')
logs = [json.loads(log['message'])['message'] for log in logs_raw]

# Filtrer les logs pour ne garder que les logs qui nous intéressent, ici les réponses aux requêtes
def log_filter(log):
    return (
            log['method'] == 'Network.responseReceived'
    )

# on filtre les logs jusqu'à ce qu'on trouve la requête qui nous intéresse, ici la requête qui contient l'url de la vidéo en .m3u8
for log in filter(log_filter, logs):
    request_id = log['params']['requestId']
    resp_url = log['params']['response']['url']
    if '.m3u8' in resp_url:
        print(resp_url)
        break

driver.quit()
```

Et voilà, nous avons récupéré l'url de la vidéo. Il ne reste plus qu'à la télécharger ou la lire sur un lecteur vidéo.

## Conclusion

Nous avons vu comment obtenir la source d'une vidéo sur le web quand celle-ci n'est pas disponible en téléchargement. Nous avons utilisé Selenium pour simuler un navigateur web et analyser le trafic réseau. Nous avons également utilisé Chromedriver pour contrôler Google Chrome avec Selenium. Nous avons ensuite filtré les logs du trafic réseau pour ne garder que les logs qui nous intéressent, ici les réponses aux requêtes. Enfin, nous avons récupéré l'url de la vidéo.

Cette méthode fonctionne pour différent type de source comme les .m3u8, les .mp4, les .mkv, etc. Il suffit de trouver le bon sélecteur CSS pour la vidéo ainsi que l'url du lecteur vidéo. Il faut également adapter le filtre des logs pour ne garder que les logs qui nous intéressent.



