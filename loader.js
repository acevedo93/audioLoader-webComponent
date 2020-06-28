class AudioLoader extends HTMLElement {
  // html Element representa un Elemento HTML y vamos a heredar una cantidad enorme de propiedades y metodos
  // para crear nuestro propio elemento html custom
  constructor() {
    super(); // ejecutara el constructor de la clase que estamos heredando
    this._loadingContainer;
    this.textLoading;
    this._audio;
    this.connectedCallback = this.connectedCallback.bind(this);
    this.attachShadow({ mode: "open" });
    // si intentamos hacer un append dentro del constructor
    // hay que entender que javascript tiene tambien un ciclo de vida para crear sus custom Elements
    // y el momento en que se crea el el web component no es el mismo momento en que lo podemos ver osea aun no es
    // parte del DOM
  }

  connectedCallback() {
    //en este punto nuestro elemento custom ya dibujado
    //en el browser entonces podemos comenzar a agregar cosas a nuestro componente
    const btn = document.createElement("button");
    this.textLoading = this.getAttribute("text");
    btn.textContent = "Cargar";
    btn.addEventListener("click", this._load.bind(this));
    this.shadowRoot.appendChild(btn);
  }

  _load() {
    this._getAudio();
    setTimeout(() => {
      this._hideLoader();
      this._createAudio();
    }, 3000);
  }
  _hideLoader() {
    this.shadowRoot.removeChild(this._loadingContainer);
  }
  _createAudio() {
    this._audio = document.createElement("audio");
    this._audio.src = this.getAttribute("src") || "hola";
    this._audio.controls = true;
    this.shadowRoot.appendChild(this._audio);
  }
  _getAudio() {
    this._loadingContainer = document.createElement("div"); // la ventaja de hacer este container ya es una propiedad de clase
    this._loadingContainer.textContent = this.textLoading || "...loading";
    this.shadowRoot.appendChild(this._loadingContainer);
    console.log("haciendo la peticion");
  }
  disconectedCallback() {
    // este metodo se ejecutara antes de ser destruido el web component y nos permitira limpiar memoria o cancelar peticiones http
  }

  attributeChangedCallback() {
    // este metodo se invoca cada vwez qeu los atributos del elemento se añaden, se quitan o cambian
  }
}

customElements.define("audio-loader", AudioLoader); // existen reglas para crear un elemento html debe tener un guion
