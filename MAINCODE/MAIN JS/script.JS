const cities = [
{ name: 'Tokyo', country: 'Japan', type: 'city', languages: [{ lang: 'Japanese', note: 'Primary language' }] },
{ name: 'Delhi', country: 'India', type: 'city', languages: [{ lang: 'Hindi', note: 'Widely spoken' }, { lang: 'English', note: 'Official language' }] },
{ name: 'Shanghai', country: 'China', type: 'city', languages: [{ lang: 'Mandarin', note: 'Primary language' }, { lang: 'Shanghainese', note: 'Regional dialect' }] },
{ name: 'São Paulo', country: 'Brazil', type: 'city', languages: [{ lang: 'Portuguese', note: 'Primary language' }] },
{ name: 'Mexico City', country: 'Mexico', type: 'city', languages: [{ lang: 'Spanish', note: 'Primary language' }] },
{ name: 'Spain', country: 'Europe', type: 'country', languages: [
{ lang: 'Spanish (Castilian)', note: 'Official nationwide' },
{ lang: 'Catalan', note: 'Co-official in Catalonia' },
{ lang: 'Basque', note: 'Co-official in Basque Country' },
{ lang: 'Galician', note: 'Co-official in Galicia' }
] }
];


const grid = document.getElementById('grid');
const search = document.getElementById('search');
const filter = document.getElementById('filter');


function render(list) {
grid.innerHTML = '';
list.forEach(item => {
const card = document.createElement('div');
card.className = 'card';


const header = document.createElement('div');
header.className = 'city-header';


const icon = document.createElement('div');
icon.className = 'icon';
icon.textContent = item.name[0] + (item.name.split(' ')[1]?.[0] || '');


const info = document.createElement('div');
info.className = 'city-info';
info.innerHTML = `<strong>${item.name}</strong><span>${item.country}</span>`;


header.appendChild(icon);
header.appendChild(info);


const langList = document.createElement('div');
langList.className = 'languages';
item.languages.forEach(l => {
const lang = document.createElement('div');
lang.className = 'language';
lang.innerHTML = `<span>${l.lang}</span><span>${l.note}</span>`;
langList.appendChild(lang);
});


card.appendChild(header);
card.appendChild(langList);
grid.appendChild(card);
});
}


function filterList() {
const q = search.value.toLowerCase();
const type = filter.value;
const filtered = cities.filter(c => {
if (type !== 'all' && c.type !== type) return false;
if (!q) return true;
return (
c.name.toLowerCase().includes(q) ||
c.country.toLowerCase().includes(q) ||
c.languages.some(l => l.lang.toLowerCase().includes(q))
);
});
render(filtered);
}


search.addEventListener('input', filterList);
filter.addEventListener('change', filterList);


render(cities);