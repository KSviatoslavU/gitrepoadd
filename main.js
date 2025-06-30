const searchInput = document.querySelector(".search__input");
const searchList = document.querySelector(".search__list");
const repoList = document.querySelector(".repo__li");

function runFetch() {
  searchList.innerHTML = "";
  fetch(
    `https://api.github.com/search/repositories?q=${searchQuery}&per_page=5`
  )
    .then((response) => {
      console.log(response);
      return response.json();
    })
    .then((data) => {
      for (let users of data.items) {
        const li = document.createElement("li");
        li.classList.add("search__li");
        li.textContent = users.name;
        li.dataset.name = users.name;
        li.dataset.owner = users.owner.login;
        li.dataset.stars = users.stargazers_count;
        searchList.appendChild(li);
        console.log(users.owner.login);
      }
      console.log(data.items);
    });
}

const debounce = (fn, debounceTime = 700) => {
  let timeoutId;

  return function (...args) {
    clearTimeout(timeoutId);
    timeoutId = setTimeout(() => {
      fn.apply(this, args);
    }, debounceTime);
  };
};

const debounceFetch = debounce(runFetch);

searchInput.addEventListener("input", function (e) {
  if (searchInput.value === "") {
    searchList.innerHTML = "";
  }
  searchQuery = searchInput.value;
  debounceFetch();
});

searchList.addEventListener("click", function (e) {
  searchInput.value = "";

  document.body.insertAdjacentHTML(
    "beforeend",
    `<div class ='repo__li'>
    <div class = 'text-group'> 
    <span>Name: ${e.target.dataset.name}</span>
    <span>Owner: ${e.target.dataset.owner}</span>
    <span>Stars: ${e.target.dataset.stars}</span>
    </div>
    <button>X</button>
      </div>`
  );
});

document.body.addEventListener("click", function (e) {
  if (e.target.tagName === "BUTTON") {
    const parentDiv = e.target.closest(".repo__li");
    if (parentDiv) {
      parentDiv.remove();
    }
  }
});
