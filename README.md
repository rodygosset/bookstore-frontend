# BookStore

*Book store website using a Java backend*

## Tech Stack & Architecture

Les 3 éléments de l'architecture de ce site web sont les suivants:

* Google Books API (source de données)
* Books Servlet (Java Backend)
* Next.js SSR
* Next.js Frontend

Lorsque le client fait une requête à l'adresse [http://localhost:3000/](http://localhost:3000/),  
le moteur de rendu côté serveur de Next.js (Next.js SSR) fait une requête au Servlet Java,  
qui lui même fait une requête à l'API de Google Books afin de récupérer les données à afficher.

Le schéma suivant illustre le flow de données dans cette architecture:

![FlowChart](/readme-ressources/BookStore%20Data%20Flowchart.png)

Les flêches en bleu représentent les **requêtes sortantes**,  
et celles en vert les **résponses**.

## Lancement du frontend

Afin de faire tourner le frontend du site, simplement taper la commande suivante:

```
npm run dev
```

> Faites attention de bien exécuter cette commande
> depuis la racine du projet Next.js

## Lancement du backend

Ouvrir le projet Eclipse et lancer le serveur, comme fait lors du cours sur les Servlet.

**Consulter & télécharger le code du backend depuis le repository GitHub suivant**:

[BookStore-Java-Backend](https://github.com/rodygosset/lp-web-app-bookstore-java-backend)