// src/admin.ts

interface Report {
  message: string;
  // url: string;
  userAgent: string;
  createdAt: string;
  _id: string;
}

const reportsTable = document.getElementById(
  "reportsTable"
) as HTMLTableElement;
const tbody = reportsTable.querySelector("tbody") as HTMLTableSectionElement;

fetch("http://localhost:3000/api/reports")
  .then((response) => response.json())
  .then((data: Report[]) => {
    data.forEach((report) => {
      const row = document.createElement("tr");

      const messageCell = document.createElement("td");
      messageCell.innerText = report.message;

      const urlCell = document.createElement("td");
      urlCell.innerText = report.url;

      const uaCell = document.createElement("td");
      uaCell.innerText = report.userAgent;

      const dateCell = document.createElement("td");
      const date = new Date(report.createdAt);
      dateCell.innerText = date.toLocaleString();

      row.appendChild(messageCell);
      row.appendChild(urlCell);
      row.appendChild(uaCell);
      row.appendChild(dateCell);

      tbody.appendChild(row);
    });
  })
  .catch((err) => {
    console.error("Error fetching reports:", err);
  });
