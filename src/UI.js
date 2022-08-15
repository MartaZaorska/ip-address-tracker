class UI {
  static displayMessage(message){
    const messageElement = document.querySelector(".message");
    messageElement.innerText = message;
    messageElement.classList.add("visible");
    setTimeout(() => messageElement.classList.remove("visible"), 5000);
  }

  static displayResult(data){
    const result = document.getElementById("result");
    result.innerHTML = data.slice(1).map(([key, value]) => `
      <article>
        <h2>${key}</h2>
        <p>${value}</p>
      </article>
    `).join("");
  }
}

export default UI;