
const jsonData = [
    { "name": "Narayana", "position": "System Architect", "office": "Mumbai", "age": "32", "start_date": "2011-04-25", "salary": "₹75,000" },
    { "name": "Amit Patel", "position": "Accountant", "office": "Delhi", "age": "35", "start_date": "2011-07-25", "salary": "₹50,000" },
    { "name": "Priya Singh", "position": "Junior Technical Author", "office": "Bangalore", "age": "28", "start_date": "2009-01-12", "salary": "₹45,000" },
    { "name": "Ananya Gupta", "position": "Senior Javascript Developer", "office": "Mumbai", "age": "29", "start_date": "2012-03-29", "salary": "₹90,000" },
    { "name": "Rajesh Khanna", "position": "Project Manager", "office": "Chennai", "age": "40", "start_date": "2010-11-15", "salary": "₹100,000" },
    { "name": "Neha Verma", "position": "Software Engineer", "office": "Hyderabad", "age": "26", "start_date": "2015-09-18", "salary": "₹60,000" },
    { "name": "Vivek Kumar", "position": "UX/UI Designer", "office": "Pune", "age": "31", "start_date": "2013-08-22", "salary": "₹70,000" },
    { "name": "Pooja Sharma", "position": "Human Resources Manager", "office": "Kolkata", "age": "36", "start_date": "2008-06-30", "salary": "₹80,000" },
];


        let currentPage = 1;
        const rowsPerPage = 5;
        let filteredData = [...jsonData];

        function renderTable(data) {
            const tableBody = document.querySelector('#dataTable tbody');
            tableBody.innerHTML = '';

            const start = (currentPage - 1) * rowsPerPage;
            const end = start + rowsPerPage;
            const paginatedData = data.slice(start, end);

            paginatedData.forEach(row => {
                const tr = document.createElement('tr');
                for (const key in row) {
                    const td = document.createElement('td');
                    td.textContent = row[key];
                    tr.appendChild(td);
                }
                tableBody.appendChild(tr);
            });
        }

        function renderPagination(data) {
            const pagination = document.getElementById('pagination');
            pagination.innerHTML = '';

            const pageCount = Math.ceil(data.length / rowsPerPage);
            for (let i = 1; i <= pageCount; i++) {
                const button = document.createElement('button');
                button.textContent = i;
                button.className = i === currentPage ? 'active' : '';
                button.addEventListener('click', () => {
                    currentPage = i;
                    renderTable(data);
                    renderPagination(data);
                });
                pagination.appendChild(button);
            }
        }

        function handleSorting(column, order) {
            filteredData.sort((a, b) => {
                if (a[column] < b[column]) return order === 'asc' ? -1 : 1;
                if (a[column] > b[column]) return order === 'asc' ? 1 : -1;
                return 0;
            });
            renderTable(filteredData);
            renderPagination(filteredData);
        }

        function handleSearch() {
            const searchTerm = document.getElementById('searchInput').value.toLowerCase();
            filteredData = jsonData.filter(item => {
                return Object.values(item).some(value =>
                    value.toString().toLowerCase().includes(searchTerm)
                );
            });
            currentPage = 1;
            renderTable(filteredData);
            renderPagination(filteredData);
        }

        document.querySelectorAll('#dataTable th').forEach(header => {
            header.addEventListener('click', () => {
                const column = header.getAttribute('data-column');
                const order = header.classList.contains('sorted-asc') ? 'desc' : 'asc';

                document.querySelectorAll('#dataTable th').forEach(th => th.classList.remove('sorted-asc', 'sorted-desc'));
                header.classList.add(order === 'asc' ? 'sorted-asc' : 'sorted-desc');

                handleSorting(column, order);
            });
        });

        document.querySelectorAll('.sort').forEach(sortButton => {
            sortButton.addEventListener('click', () => {
                const column = sortButton.getAttribute('data-column');
                const order = sortButton.classList.contains('sorted-asc') ? 'desc' : 'asc';

                document.querySelectorAll('.sort').forEach(button => button.innerHTML = '&#x25B2;&#x25BC;');
                sortButton.innerHTML = order === 'asc' ? '&#x25B2;' : '&#x25BC;';

                handleSorting(column, order);
            });
        });

        document.getElementById('searchInput').addEventListener('input', handleSearch);

        renderTable(filteredData);
        renderPagination(filteredData);