# Cours Complet : Tests Unitaires avec la Méthode AAA

## Table des matières

1. [Introduction aux tests unitaires](#introduction-aux-tests-unitaires)
2. [La méthode AAA (Arrange, Act, Assert)](#la-méthode-aaa-arrange-act-assert)
3. [Installation et configuration](#installation-et-configuration)
4. [Tests unitaires avec Vitest](#tests-unitaires-avec-vitest)
5. [Tests d'API avec Supertest](#tests-dapi-avec-supertest)
6. [Bonnes pratiques](#bonnes-pratiques)
7. [Exercices pratiques](#exercices-pratiques)

---

## Introduction aux tests unitaires

### Qu'est-ce qu'un test unitaire ?

Un **test unitaire** est une méthode de test logiciel qui consiste à isoler une petite partie du code (une "unité") et à vérifier qu'elle fonctionne correctement de manière indépendante. Une unité peut être :
- Une fonction
- Une méthode de classe
- Un module
- Un composant

### Pourquoi écrire des tests unitaires ?

Les tests unitaires offrent de nombreux avantages :

1. **Détection précoce des bugs** : Les erreurs sont identifiées rapidement avant la mise en production
2. **Documentation vivante** : Les tests servent d'exemples d'utilisation du code
3. **Refactoring sécurisé** : Vous pouvez modifier le code en toute confiance
4. **Confiance accrue** : Vous savez que votre code fonctionne comme prévu
5. **Amélioration de la qualité** : Écrire des tests force à penser aux cas limites

### Terminologie importante

- **Test Case** : Un cas de test individuel qui vérifie un comportement spécifique
- **Test Suite** : Un ensemble de tests regroupés ensemble
- **Assertion** : Une vérification qui détermine si le test passe ou échoue
- **Mock** : Un objet simulé qui remplace une dépendance réelle pendant les tests
- **Stub** : Une implémentation simplifiée d'une fonction ou d'un objet
- **Spy** : Un outil qui enregistre les appels à une fonction sans modifier son comportement
- **Coverage** : Le pourcentage de code exécuté par les tests
- **TDD (Test-Driven Development)** : Développement guidé par les tests (écrire les tests avant le code)

---

## La méthode AAA (Arrange, Act, Assert)

### Présentation de la méthode AAA

La méthode **AAA** (Arrange, Act, Assert) est un pattern de structuration des tests qui divise chaque test en trois phases distinctes :

```
Arrange → Act → Assert
```

Cette structure rend les tests plus lisibles, maintenables et faciles à comprendre.

### Phase 1 : Arrange (Préparer)

**Définition** : La phase **Arrange** consiste à préparer l'environnement de test. C'est ici que vous :
- Initialisez les variables nécessaires
- Configurez les données de test (fixtures)
- Créez les mocks et stubs
- Configurez l'état initial requis

**Objectif** : Mettre en place toutes les conditions nécessaires pour exécuter le test.

**Exemple** :
```javascript
// Arrange
const nom = "Dupont";
const prenom = "Jean";
const email = "jean.dupont@example.com";
const password = "motdepasse123";
```

### Phase 2 : Act (Agir)

**Définition** : La phase **Act** consiste à exécuter la fonction ou le code que vous testez. C'est l'action principale du test.

**Objectif** : Appeler la fonction/méthode avec les paramètres préparés et capturer le résultat.

**Exemple** :
```javascript
// Act
const result = await addUser(nom, prenom, email, password);
```

### Phase 3 : Assert (Vérifier)

**Définition** : La phase **Assert** consiste à vérifier que le résultat obtenu correspond aux attentes. C'est ici que vous utilisez les assertions pour valider le comportement.

**Objectif** : Confirmer que le code a produit le résultat attendu.

**Exemple** :
```javascript
// Assert
expect(result.insertId).toBeGreaterThan(0);
expect(result.affectedRows).toBe(1);
```

### Exemple complet avec la méthode AAA

```javascript
import { describe, it, expect } from 'vitest';
import { addUser } from '../models/usersModel.js';

describe('addUser', () => {
    it('devrait créer un nouvel utilisateur avec succès', async () => {
        // Arrange : Préparer les données de test
        const nom = "Dupont";
        const prenom = "Jean";
        const email = "jean.dupont@example.com";
        const password = "motdepasse123";
        
        // Act : Exécuter la fonction à tester
        const result = await addUser(nom, prenom, email, password);
        
        // Assert : Vérifier le résultat
        expect(result).toBeDefined();
        expect(result.insertId).toBeGreaterThan(0);
        expect(result.affectedRows).toBe(1);
    });
});
```

### Avantages de la méthode AAA

1. **Lisibilité** : Structure claire et prévisible
2. **Maintenabilité** : Facile à modifier et à comprendre
3. **Séparation des responsabilités** : Chaque phase a un rôle précis
4. **Standardisation** : Tous les tests suivent le même pattern
5. **Débogage facilité** : Plus facile d'identifier où le problème se situe

---

## Installation et configuration

### Installation de Vitest

Vitest est un framework de test rapide et moderne, compatible avec Vite. Il utilise la même configuration que Vite.

#### Pour le frontend (React)

```bash
npm install -D vitest @vitest/ui
```

#### Pour le backend (Node.js)

```bash
npm install -D vitest
```

### Installation de Supertest

Supertest est une bibliothèque de haut niveau pour tester les APIs HTTP Node.js. Elle facilite les tests d'intégration pour Express.

```bash
npm install -D supertest
```

### Configuration de Vitest

#### Configuration pour le frontend

Créez un fichier `vitest.config.js` à la racine du dossier `front` :

```javascript
import { defineConfig } from 'vitest/config';
import react from '@vitejs/plugin-react';

export default defineConfig({
  plugins: [react()],
  test: {
    globals: true,
    environment: 'jsdom',
    setupFiles: './src/test/setup.js',
  },
});
```

#### Configuration pour le backend

Créez un fichier `vitest.config.js` à la racine du dossier `back` :

```javascript
import { defineConfig } from 'vitest/config';

export default defineConfig({
  test: {
    globals: true,
    environment: 'node',
  },
});
```

### Ajout des scripts dans package.json

#### Frontend

```json
{
  "scripts": {
    "test": "vitest",
    "test:ui": "vitest --ui",
    "test:coverage": "vitest --coverage"
  }
}
```

#### Backend

```json
{
  "scripts": {
    "test": "vitest",
    "test:ui": "vitest --ui",
    "test:coverage": "vitest --coverage"
  }
}
```

---

## Tests unitaires avec Vitest

### Structure de base d'un test Vitest

```javascript
import { describe, it, expect } from 'vitest';

describe('Nom du module ou de la fonction', () => {
    it('devrait faire quelque chose de spécifique', () => {
        // Arrange
        // Act
        // Assert
    });
});
```

### Les fonctions principales de Vitest

#### `describe()`
Groupe plusieurs tests ensemble. Prend deux paramètres :
- **Nom du groupe** : Description du groupe de tests
- **Fonction callback** : Contient les tests

```javascript
describe('usersModel', () => {
    // Tests ici
});
```

#### `it()` ou `test()`
Définit un test individuel. Prend deux paramètres :
- **Description** : Ce que le test vérifie
- **Fonction callback** : Le code du test

```javascript
it('devrait retourner tous les utilisateurs', async () => {
    // Test ici
});
```

#### `expect()`
Utilisé pour faire des assertions. Prend une valeur et retourne un objet avec des matchers.

```javascript
expect(valeur).toBe(attendu);
```

### Matchers courants de Vitest

#### Égalité
```javascript
expect(2 + 2).toBe(4);                    // Égalité stricte (===)
expect({ nom: 'Jean' }).toEqual({ nom: 'Jean' }); // Égalité profonde
```

#### Vérité
```javascript
expect(true).toBeTruthy();
expect(false).toBeFalsy();
expect(null).toBeNull();
expect(undefined).toBeUndefined();
```

#### Nombres
```javascript
expect(10).toBeGreaterThan(5);
expect(5).toBeLessThan(10);
expect(5.5).toBeCloseTo(5.5, 2);
```

#### Chaînes de caractères
```javascript
expect('Hello World').toContain('World');
expect('email@test.com').toMatch(/^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/);
```

#### Tableaux et objets
```javascript
expect(['a', 'b', 'c']).toContain('b');
expect({ nom: 'Jean', age: 30 }).toHaveProperty('nom');
expect({ nom: 'Jean' }).toMatchObject({ nom: 'Jean' });
```

#### Exceptions
```javascript
expect(() => { throw new Error('Erreur') }).toThrow();
expect(() => { throw new Error('Erreur') }).toThrow('Erreur');
```

### Tests asynchrones

Vitest supporte les tests asynchrones de plusieurs façons :

#### Avec async/await (recommandé)
```javascript
it('devrait récupérer les utilisateurs', async () => {
    // Arrange
    // Act
    const users = await allUsers();
    // Assert
    expect(users).toBeDefined();
    expect(Array.isArray(users)).toBe(true);
});
```

#### Avec des Promises
```javascript
it('devrait récupérer les utilisateurs', () => {
    return allUsers().then(users => {
        expect(users).toBeDefined();
    });
});
```

### Hooks de cycle de vie

Vitest fournit des hooks pour exécuter du code à différents moments :

#### `beforeAll()` et `afterAll()`
Exécutés une fois avant/après tous les tests du groupe.

```javascript
describe('usersModel', () => {
    beforeAll(async () => {
        // Connexion à la base de données de test
    });
    
    afterAll(async () => {
        // Fermeture de la connexion
    });
});
```

#### `beforeEach()` et `afterEach()`
Exécutés avant/après chaque test.

```javascript
describe('usersModel', () => {
    beforeEach(() => {
        // Réinitialiser les données avant chaque test
    });
    
    afterEach(() => {
        // Nettoyer après chaque test
    });
});
```

### Exemple complet : Test d'un modèle

```javascript
import { describe, it, expect, beforeAll, afterAll, beforeEach } from 'vitest';
import { addUser, getUserById, deleteUser } from '../models/usersModel.js';

describe('usersModel', () => {
    let userId;
    
    beforeAll(async () => {
        // Connexion à la base de données de test
    });
    
    beforeEach(() => {
        // Nettoyer les données avant chaque test si nécessaire
    });
    
    describe('addUser', () => {
        it('devrait créer un nouvel utilisateur', async () => {
            // Arrange
            const nom = "Test";
            const prenom = "User";
            const email = "test@example.com";
            const password = "hashedPassword123";
            
            // Act
            const result = await addUser(nom, prenom, email, password);
            
            // Assert
            expect(result).toBeDefined();
            expect(result.insertId).toBeGreaterThan(0);
            expect(result.affectedRows).toBe(1);
            
            userId = result.insertId;
        });
        
        it('devrait échouer avec des données invalides', async () => {
            // Arrange
            const nom = null;
            const prenom = "User";
            const email = "test@example.com";
            const password = "hashedPassword123";
            
            // Act & Assert
            await expect(addUser(nom, prenom, email, password))
                .rejects.toThrow();
        });
    });
    
    describe('getUserById', () => {
        it('devrait retourner un utilisateur existant', async () => {
            // Arrange
            const id = 1;
            
            // Act
            const user = await getUserById(id);
            
            // Assert
            expect(user).toBeDefined();
            expect(Array.isArray(user)).toBe(true);
            expect(user.length).toBeGreaterThan(0);
            expect(user[0]).toHaveProperty('id');
            expect(user[0]).toHaveProperty('email');
        });
        
        it('devrait retourner un tableau vide pour un ID inexistant', async () => {
            // Arrange
            const id = 99999;
            
            // Act
            const user = await getUserById(id);
            
            // Assert
            expect(user).toBeDefined();
            expect(Array.isArray(user)).toBe(true);
            expect(user.length).toBe(0);
        });
    });
    
    afterAll(async () => {
        // Nettoyer : supprimer l'utilisateur de test
        if (userId) {
            await deleteUser(userId);
        }
    });
});
```

### Mocks et Stubs avec Vitest

#### Mocker une fonction

```javascript
import { describe, it, expect, vi } from 'vitest';

describe('Exemple avec mock', () => {
    it('devrait appeler une fonction mockée', () => {
        // Arrange
        const mockFn = vi.fn();
        
        // Act
        mockFn('param1', 'param2');
        
        // Assert
        expect(mockFn).toHaveBeenCalled();
        expect(mockFn).toHaveBeenCalledWith('param1', 'param2');
        expect(mockFn).toHaveBeenCalledTimes(1);
    });
});
```

#### Mocker un module

```javascript
import { describe, it, expect, vi } from 'vitest';
import * as usersModel from '../models/usersModel.js';

// Mock du module
vi.mock('../models/usersModel.js', () => ({
    allUsers: vi.fn(),
    addUser: vi.fn(),
}));

describe('usersController avec mock', () => {
    it('devrait retourner tous les utilisateurs', async () => {
        // Arrange
        const mockUsers = [
            { id: 1, nom: 'Dupont', prenom: 'Jean', email: 'jean@test.com' },
            { id: 2, nom: 'Martin', prenom: 'Marie', email: 'marie@test.com' }
        ];
        usersModel.allUsers.mockResolvedValue(mockUsers);
        
        // Act
        const users = await usersModel.allUsers();
        
        // Assert
        expect(users).toEqual(mockUsers);
        expect(usersModel.allUsers).toHaveBeenCalled();
    });
});
```

---

## Tests d'API avec Supertest

### Introduction à Supertest

Supertest permet de tester les endpoints HTTP de votre API Express sans avoir à démarrer un serveur réel. Il simule les requêtes HTTP et vérifie les réponses.

### Structure de base d'un test Supertest

```javascript
import { describe, it, expect } from 'vitest';
import request from 'supertest';
import app from '../index.js'; // Votre application Express

describe('API Users', () => {
    it('devrait retourner tous les utilisateurs', async () => {
        // Arrange
        // Act
        const response = await request(app)
            .get('/api/users/allUsers')
            .set('Authorization', 'Bearer token123');
        
        // Assert
        expect(response.status).toBe(200);
        expect(response.body).toBeDefined();
    });
});
```

### Méthodes HTTP avec Supertest

#### GET
```javascript
const response = await request(app)
    .get('/api/users/allUsers')
    .query({ page: 1, limit: 10 });
```

#### POST
```javascript
const response = await request(app)
    .post('/api/users/addUser')
    .send({
        nom: 'Dupont',
        prenom: 'Jean',
        email: 'jean@example.com',
        password: 'password123'
    })
    .set('Content-Type', 'application/json');
```

#### PUT
```javascript
const response = await request(app)
    .put('/api/users/updateUser/1')
    .send({
        nom: 'Dupont',
        prenom: 'Jean',
        email: 'jean@example.com',
        role: 'admin'
    });
```

#### DELETE
```javascript
const response = await request(app)
    .delete('/api/users/deleteUser/1');
```

### Vérifications des réponses

#### Statut HTTP
```javascript
expect(response.status).toBe(200);
expect(response.status).toBe(201);
expect(response.status).toBe(404);
expect(response.status).toBe(500);
```

#### Corps de la réponse
```javascript
expect(response.body).toBeDefined();
expect(response.body).toHaveProperty('message');
expect(response.body.message).toBe('utilisateur créé');
expect(response.body).toMatchObject({
    message: 'utilisateur créé',
    addedUser: expect.any(Object)
});
```

#### Headers
```javascript
expect(response.headers['content-type']).toMatch(/json/);
expect(response.headers).toHaveProperty('authorization');
```

### Exemple complet : Tests d'API

```javascript
import { describe, it, expect, beforeAll, afterAll } from 'vitest';
import request from 'supertest';
import app from '../index.js';

describe('API Users', () => {
    let authToken;
    let createdUserId;
    
    beforeAll(async () => {
        // Se connecter pour obtenir un token
        const loginResponse = await request(app)
            .post('/api/users/login')
            .send({
                email: 'admin@test.com',
                password: 'password123'
            });
        
        authToken = loginResponse.body.token;
    });
    
    describe('POST /api/users/addUser', () => {
        it('devrait créer un nouvel utilisateur', async () => {
            // Arrange
            const newUser = {
                nom: 'Test',
                prenom: 'User',
                email: `test${Date.now()}@example.com`,
                password: 'password123'
            };
            
            // Act
            const response = await request(app)
                .post('/api/users/addUser')
                .send(newUser)
                .set('Content-Type', 'application/json');
            
            // Assert
            expect(response.status).toBe(201);
            expect(response.body).toHaveProperty('message');
            expect(response.body.message).toBe('utilisateur créé');
            expect(response.body).toHaveProperty('addedUser');
            expect(response.body.addedUser).toBeDefined();
        });
        
        it('devrait échouer avec des données manquantes', async () => {
            // Arrange
            const incompleteUser = {
                nom: 'Test',
                // prenom manquant
                email: 'test@example.com'
                // password manquant
            };
            
            // Act
            const response = await request(app)
                .post('/api/users/addUser')
                .send(incompleteUser);
            
            // Assert
            expect(response.status).toBe(500);
        });
    });
    
    describe('GET /api/users/allUsers', () => {
        it('devrait retourner tous les utilisateurs avec un token valide', async () => {
            // Arrange
            // Act
            const response = await request(app)
                .get('/api/users/allUsers')
                .set('Authorization', `Bearer ${authToken}`);
            
            // Assert
            expect(response.status).toBe(200);
            expect(Array.isArray(response.body)).toBe(true);
            expect(response.body.length).toBeGreaterThan(0);
            expect(response.body[0]).toHaveProperty('id');
            expect(response.body[0]).toHaveProperty('nom');
            expect(response.body[0]).toHaveProperty('email');
        });
        
        it('devrait échouer sans token d\'authentification', async () => {
            // Arrange
            // Act
            const response = await request(app)
                .get('/api/users/allUsers');
            
            // Assert
            expect(response.status).toBe(401);
        });
    });
    
    describe('POST /api/users/login', () => {
        it('devrait authentifier un utilisateur valide', async () => {
            // Arrange
            const credentials = {
                email: 'admin@test.com',
                password: 'password123'
            };
            
            // Act
            const response = await request(app)
                .post('/api/users/login')
                .send(credentials);
            
            // Assert
            expect(response.status).toBe(200);
            expect(response.body).toHaveProperty('message');
            expect(response.body.message).toBe('Login successful');
            expect(response.body).toHaveProperty('token');
            expect(typeof response.body.token).toBe('string');
        });
        
        it('devrait échouer avec des identifiants invalides', async () => {
            // Arrange
            const invalidCredentials = {
                email: 'wrong@example.com',
                password: 'wrongpassword'
            };
            
            // Act
            const response = await request(app)
                .post('/api/users/login')
                .send(invalidCredentials);
            
            // Assert
            expect(response.status).toBe(401);
            expect(response.body).toHaveProperty('message');
            expect(response.body.message).toBe('Invalid credentials');
        });
    });
    
    describe('DELETE /api/users/deleteUser/:id', () => {
        it('devrait supprimer un utilisateur avec un token valide', async () => {
            // Arrange
            const userId = 1;
            
            // Act
            const response = await request(app)
                .delete(`/api/users/deleteUser/${userId}`)
                .set('Authorization', `Bearer ${authToken}`);
            
            // Assert
            expect(response.status).toBe(200);
            expect(response.body).toHaveProperty('message');
            expect(response.body.message).toBe('utilisateur supprimé');
        });
    });
    
    afterAll(async () => {
        // Nettoyer les données de test si nécessaire
    });
});
```

### Tests avec base de données de test

Pour les tests d'intégration, il est recommandé d'utiliser une base de données de test séparée :

```javascript
import { describe, it, expect, beforeAll, afterAll, beforeEach } from 'vitest';
import request from 'supertest';
import app from '../index.js';
import connexion from '../config/db.js';

describe('API Users avec DB de test', () => {
    beforeAll(async () => {
        // Connexion à la base de données de test
        // Migration ou création des tables de test
    });
    
    beforeEach(async () => {
        // Nettoyer les données avant chaque test
        await connexion.query('DELETE FROM users WHERE email LIKE "test%@example.com"');
    });
    
    it('devrait créer et récupérer un utilisateur', async () => {
        // Arrange
        const newUser = {
            nom: 'Test',
            prenom: 'User',
            email: `test${Date.now()}@example.com`,
            password: 'password123'
        };
        
        // Act - Créer l'utilisateur
        const createResponse = await request(app)
            .post('/api/users/addUser')
            .send(newUser);
        
        // Assert - Vérifier la création
        expect(createResponse.status).toBe(201);
        const userId = createResponse.body.addedUser.insertId;
        
        // Act - Récupérer l'utilisateur
        const getResponse = await request(app)
            .get(`/api/users/getUserById/${userId}`)
            .set('Authorization', `Bearer ${authToken}`);
        
        // Assert - Vérifier la récupération
        expect(getResponse.status).toBe(200);
        expect(getResponse.body[0].email).toBe(newUser.email);
    });
    
    afterAll(async () => {
        // Nettoyer et fermer la connexion
        await connexion.end();
    });
});
```

---

## Bonnes pratiques

### 1. Nommage des tests

Utilisez des noms descriptifs qui expliquent ce qui est testé :

✅ **Bon** :
```javascript
it('devrait retourner un tableau vide quand aucun utilisateur n\'existe', async () => {
    // ...
});
```

❌ **Mauvais** :
```javascript
it('test 1', async () => {
    // ...
});
```

### 2. Un test, une assertion (quand c'est possible)

Chaque test devrait vérifier un comportement spécifique :

✅ **Bon** :
```javascript
it('devrait retourner un utilisateur avec les bonnes propriétés', async () => {
    const user = await getUserById(1);
    expect(user).toHaveProperty('id');
    expect(user).toHaveProperty('email');
    expect(user).toHaveProperty('nom');
});
```

### 3. Tests indépendants

Chaque test doit pouvoir s'exécuter indépendamment :

✅ **Bon** :
```javascript
beforeEach(async () => {
    // Réinitialiser l'état avant chaque test
});
```

❌ **Mauvais** :
```javascript
// Test 2 dépend du résultat du Test 1
```

### 4. Utiliser des données de test réalistes

✅ **Bon** :
```javascript
const user = {
    nom: 'Dupont',
    prenom: 'Jean',
    email: 'jean.dupont@example.com',
    password: 'SecurePassword123!'
};
```

❌ **Mauvais** :
```javascript
const user = {
    nom: 'a',
    prenom: 'b',
    email: 'c',
    password: 'd'
};
```

### 5. Tester les cas limites

N'oubliez pas de tester :
- Les cas d'erreur
- Les valeurs nulles
- Les valeurs vides
- Les valeurs extrêmes
- Les cas limites

```javascript
describe('addUser', () => {
    it('devrait créer un utilisateur avec des données valides', async () => {
        // Cas normal
    });
    
    it('devrait échouer avec un email invalide', async () => {
        // Cas d'erreur
    });
    
    it('devrait échouer avec des champs vides', async () => {
        // Cas limite
    });
});
```

### 6. Organiser les tests par fonctionnalité

```javascript
describe('usersModel', () => {
    describe('addUser', () => {
        // Tous les tests pour addUser
    });
    
    describe('getUserById', () => {
        // Tous les tests pour getUserById
    });
});
```

### 7. Nettoyer après les tests

```javascript
afterAll(async () => {
    // Supprimer les données de test
    await deleteUser(testUserId);
    await connexion.end();
});
```

### 8. Utiliser des mocks pour les dépendances externes

```javascript
// Mock d'une dépendance externe
vi.mock('../config/db.js', () => ({
    default: {
        query: vi.fn()
    }
}));
```

### 9. Documenter les tests complexes

```javascript
it('devrait gérer correctement la concurrence lors de la création', async () => {
    // Ce test vérifie que deux requêtes simultanées
    // avec le même email ne créent pas de doublons
    // ...
});
```

### 10. Maintenir un bon taux de couverture

Visez au moins 70-80% de couverture de code, mais privilégiez la qualité à la quantité.

---

## Exercices pratiques

### Exercice 1 : Test unitaire basique

Créez un test pour la fonction `getUserById` du modèle `usersModel.js` en suivant la méthode AAA.

**Critères de réussite** :
- Utilisez la méthode AAA
- Testez le cas où l'utilisateur existe
- Testez le cas où l'utilisateur n'existe pas
- Utilisez des assertions appropriées

### Exercice 2 : Test d'API avec Supertest

Créez des tests pour l'endpoint `POST /api/users/login` avec Supertest.

**Critères de réussite** :
- Testez le cas de succès (identifiants valides)
- Testez le cas d'échec (identifiants invalides)
- Testez le cas avec des données manquantes
- Vérifiez le statut HTTP et le corps de la réponse

### Exercice 3 : Test avec mocks

Créez un test pour le contrôleur `addUser` en mockant le modèle `usersModel`.

**Critères de réussite** :
- Mockez la fonction `addUser` du modèle
- Testez le contrôleur sans accès à la base de données
- Vérifiez que le contrôleur appelle correctement le modèle
- Vérifiez la réponse HTTP

### Exercice 4 : Test de cas limites

Créez des tests pour gérer les cas limites de la fonction `updateUser`.

**Critères de réussite** :
- Testez avec un ID inexistant
- Testez avec des données nulles
- Testez avec des chaînes vides
- Testez avec des valeurs extrêmement longues

### Exercice 5 : Suite de tests complète

Créez une suite de tests complète pour tous les endpoints de l'API users.

**Critères de réussite** :
- Tests pour tous les endpoints (GET, POST, PUT, DELETE)
- Tests d'authentification
- Tests de validation
- Tests de cas d'erreur
- Utilisation de hooks (beforeAll, afterAll, beforeEach)

---

## Ressources supplémentaires

### Documentation officielle

- [Vitest Documentation](https://vitest.dev/)
- [Supertest Documentation](https://github.com/visionmedia/supertest)
- [Jest Matchers (compatibles avec Vitest)](https://jestjs.io/docs/expect)

### Articles recommandés

- Test-Driven Development (TDD)
- Behavior-Driven Development (BDD)
- Tests d'intégration vs Tests unitaires
- Mocks vs Stubs vs Spies

### Outils complémentaires

- **@testing-library/react** : Pour tester les composants React
- **@testing-library/user-event** : Pour simuler les interactions utilisateur
- **nock** : Pour mocker les requêtes HTTP
- **sinon** : Bibliothèque de mocks et stubs avancés

---

## Conclusion

Les tests unitaires sont essentiels pour maintenir un code de qualité. La méthode AAA vous aide à structurer vos tests de manière claire et maintenable. Vitest et Supertest sont des outils puissants qui facilitent l'écriture et l'exécution de tests dans vos projets Node.js et React.

**Rappelez-vous** :
- Arrange → Act → Assert
- Un test = un comportement
- Tests indépendants et isolés
- Nommer clairement vos tests
- Tester les cas normaux ET les cas limites

Bon courage avec vos tests ! 🚀

