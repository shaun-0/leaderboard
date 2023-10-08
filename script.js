
console.clear();

// Containers
const wrapper = document.getElementById('wrapper');
const header = document.getElementById('header');
const drawer = document.getElementById('drawer');
const swipeZone = document.getElementById('swipeZone');

// Create Element
const createNode = element => {
  return document.createElement(element);
};

// Append Element
const append = (parent, el) => {
  return parent.appendChild(el);
};



// Render Empty State
const emptyState = () => {
  const newText = createNode('div');
  newText.classList = 'c-empty-state';
  newText.innerHTML = `
		<svg class="c-empty-state__icon" viewBox="0 0 24 24" width="48" height="48" stroke="currentColor" stroke-width="2" fill="none" stroke-linecap="round" stroke-linejoin="round">
			<line x1="12" y1="2" x2="12" y2="6"></line>
			<line x1="12" y1="18" x2="12" y2="22"></line>
			<line x1="4.93" y1="4.93" x2="7.76" y2="7.76"></line>
			<line x1="16.24" y1="16.24" x2="19.07" y2="19.07"></line>
			<line x1="2" y1="12" x2="6" y2="12"></line>
			<line x1="18" y1="12" x2="22" y2="12"></line>
			<line x1="4.93" y1="19.07" x2="7.76" y2="16.24"></line>
			<line x1="16.24" y1="7.76" x2="19.07" y2="4.93"></line>
		</svg>
		<div style="margin-top: 8px;">Loading...</div>
	`;
  append(wrapper, newText);
  setTimeout(() => {
    newText.remove();
  }, 500);
};

// Render Driver Standings
const renderList = () => {
  const url = `https://osoc-db.herokuapp.com/api/sql/players`; // ENTER your game API URL
  emptyState();
  
  fetch(url).
  then(response => {
    return response.json();
  }).
  then(newData => {

    const tableClass = 'c-table';
    let table = createNode('table');
    table.classList = tableClass;
    const tableContainer = document.querySelector(tableClass);
    table.innerHTML = `
			<thead class="c-table__head">
				<tr class="c-table__head-row">
					<th class="c-table__head-cell u-text--center">Place</th>
					<th class="c-table__head-cell">Participant</th>
					<th class="c-table__head-cell u-text--right">Points</th>
				</tr>
			</thead>
			<tbody>
			</tbody>
		`;
    const title = createNode('div');
    title.classList = 'c-headline';
    title.innerHTML = `<h4 class="c-headline__title"><small class="u-text--danger">Shoot At Sight</small><br />Leaderboard <small class="u-text--secondary"></small></h4>`;
    append(wrapper, title);
    append(wrapper, table);
    let position=0;
    newData.forEach(item => {
      position++;
      const tableBody = table.querySelector('tbody');
      let tr = createNode('tr');
      tr.classList = "c-table__row";
      tr.innerHTML = `
						<td class="c-table__cell c-table__cell--place u-text--center"><span class="c-place">${position}</span></td>
					<td class="c-table__cell c-table__cell--name">${item.username}</td>
					<td class="c-table__cell c-table__cell--points u-text--right"><strong>${item.projectedScore}</strong></td>
				`;

      if (position == 1) {
        tr.querySelector('.c-place').classList.add('c-place--first');


      

      } else if (position == 2) {
        tr.querySelector('.c-place').classList.add('c-place--second');
      } else if (position == 3) {
        tr.querySelector('.c-place').classList.add('c-place--third');
      }
      append(tableBody, tr);
    });

  }).
  catch(err => {
    console.log(err);
  });

};

// Theme toggle
document.getElementById('test').addEventListener('click', () => {
  document.documentElement.classList.toggle('theme--dark');
  document.getElementById('test').classList.toggle('c-toggle--active');
});

 renderList();


