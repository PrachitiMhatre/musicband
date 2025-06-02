# 🎸 MusicBand Finder App

A full-stack application that allows users to search for music bands founded in the last 10 years in a specific city, or automatically based on their location.

---

## Tech Stack

- **Backend**: Ruby on Rails (`musicbands-api/`)
- **Frontend**: React (`musicbands-api/frontend/`)
- **APIs Used**:
  - [MusicBrainz API](https://musicbrainz.org/doc/MusicBrainz_API) — to 
  fetch artist data
  - [GeoJS API](https://get.geojs.io) — to get user's city via IP fallback

---

## Features

- 🔍 Search for up to **50 bands** founded in a given city in the last **10 years**
- 🌍 Detect user’s location via **browser geolocation**
- 🧭 Fallback to **IP geolocation** if browser permission is denied
- 🎶 Fetch band data using **MusicBrainz’s `area` and `artist` endpoints**
- 📦 Fully integrated frontend and backend in a monolith structure

---

## 🚀 Getting Started (Local Dev)

### 🔧 1. Install Ruby via RVM

> Required Ruby version: **3.2.2**

If RVM is not installed:

```bash
\curl -sSL https://get.rvm.io | bash -s stable
source ~/.rvm/scripts/
```

Then install Ruby:

```bash
rvm install 3.2.2
rvm use 3.2.2 --default
```
Check version:

```bash
ruby -v
# => ruby 3.2.2
```

### 📂 2. Clone the Repository and Navigate to Backend and Install Gems
```bash
git clone https://github.com/PrachitiMhatre/musicband.git`
cd musicbands-api
bundle install
```

### ⚛️ 3. Set Up React Frontend
```bash
cd frontend
npm install
npm run build
```

Copy the React build into the Rails public/ folder:

```bash
cp -r build/* ../public/
```

### ▶️ 4. Start Rails Server
From backend/ root:

```bash
rails server
```
Visit http://localhost:3000

## Running Test Cases

This project uses **RSpec** for testing.

To run all tests:

```bash
bundle exec rspec
```
## 🚀 Deployment

This project is deployed on **Railway**.

🔗 **Live URL**: [https://musicband-production.up.railway.app/](https://musicband-production.up.railway.app/)


