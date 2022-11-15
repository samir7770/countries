let n = 12;
let countriesAll = [];
const loadMore = () => {
  getUser(countriesAll.slice(n, n + 12));
  n += 12;
};
fetch("https://restcountries.com/v3.1/all")
  .then((res) => res.json())
  .then((countries) => {
    countriesAll = [...countries];
    getUser(countries.slice(0, n));
  });

const container = document.getElementById("country-container");
const getUser = (countries) => {
  countries.map((country) => {
    container.innerHTML += `
      <div class="col-4 p-2">
        <div>
          <div class="card">
            <div class="row g-0 p-3">
              <div class="col-md-5">
                <img src="${
                  country.flags.svg
                }" class="img-fluid rounded-start" alt="...">
              </div>
              <div class="col-md-7">
                <div class="card-body">
                  <h5 class="card-title">${country.name.common}</h5>
                  <p class="card-text">Capital : ${country.capital}</p>
                  <!-- Button trigger modal -->
                  <button type="button" class="btn btn btn-outline-light mt-2" data-bs-toggle="modal" data-bs-target="#${
                    country.cca2
                  }">Know More</button>
                </div>
              </div>
            </div>
          </div>
         </div> 
      </div>
      <!-- Modal -->
      <div class="text-dark modal fade" id="${
        country.cca2
      }"  data-bs-backdrop="static" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
        <div class="modal-dialog modal-dialog-centered modal-dialog-scrollable">
          <div class="modal-content">
            <div class="modal-header">
              <h5 class="modal-title" id="exampleModalLabel">${
                country.name.common
              }</h5>
              <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
            </div>
            <div class="modal-body p-4">
              <div>
                <img src="${country.flags.png}" alt="" />
                <p class="mt-3">Official Name : ${country.name.official}</p>
                <p>Continents : ${country.continents[0]}</p>
                <p>Sub-Continents : ${country.subregion}</p>
                <p>Languages : ${Object.values(country.languages).map(
                  (x) => x
                )}</p>
                <p>Close To : ${
                  country.borders ? country.borders.map((x) => x) : "Null"
                }</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    `;
  });
};
