// Your web app's Firebase configuration
var firebaseConfig = {
  apiKey: "AIzaSyB89Q0zZoegIQ89li-FQ9wwwugyHng59p4",
  authDomain: "projetocrud-abcad.firebaseapp.com",
  projectId: "projetocrud-abcad",
  storageBucket: "projetocrud-abcad.appspot.com",
  messagingSenderId: "124181371095",
  appId: "1:124181371095:web:0f447fababa039ea97f892",
};

// Initialize Firebase
firebase.initializeApp(firebaseConfig);
const db = firebase.firestore();

const craft_user_logger = window.sessionStorage.getItem("craft_user_logger");
if (craft_user_logger) {
  document.querySelectorAll(".item-not-log").forEach(function (element) {
    element.remove();
  });
  if(document.querySelector("#indexLogin")) {
    document.querySelector("#indexLogin").innerHTML = window.sessionStorage.getItem("craft_user_name");
    document.querySelector("#indexLogin").href = 'myCrafts.html';
  }
} else {
  document.querySelectorAll(".item-log").forEach(function (element) {
    element.remove();
  });
}

function salveCraft() {
  const idUser = window.sessionStorage.getItem("craft_user_logger") || false;

  const id = window.sessionStorage.getItem("craftArtsId") || false;
  const corpo = window.sessionStorage.getItem("corpo");
  const cabelo = window.sessionStorage.getItem("cabelo");
  const sobrancelha = window.sessionStorage.getItem("sobrancelha");
  const olho = window.sessionStorage.getItem("olho");
  const nariz = window.sessionStorage.getItem("nariz");
  const boca = window.sessionStorage.getItem("boca");

  const corpele = window.sessionStorage.getItem("corpele");
  const corcabelo = window.sessionStorage.getItem("corcabelo");
  const corsobrancelha = window.sessionStorage.getItem("corsobrancelha");
  const corolho = window.sessionStorage.getItem("corolho");

  if (idUser) {
    if (id) {
      db.collection("craftArts")
        .doc(id)
        .update({
          idUser,
          corpo,
          cabelo,
          sobrancelha,
          olho,
          nariz,
          boca,
          corpele,
          corcabelo,
          corsobrancelha,
          corolho,
        })
        .then(() => {
          alertCraftRedirect("Craft Editado com sucesso!", "myCrafts.html");
        });
    } else {
      db.collection("craftArts")
        .add({
          idUser,
          corpo,
          cabelo,
          sobrancelha,
          olho,
          nariz,
          boca,
          corpele,
          corcabelo,
          corsobrancelha,
          corolho,
        })
        .then(() => {
          alertCraftRedirect("Craft Salvo com sucesso!", "myCrafts.html");
        });
    }
  } else {
    alertCraft("Efetue o login");
  }
}

function saveDataRegister() {
  const nome = document.querySelector("input#nome").value;
  const email = document.querySelector("input#email").value;
  const password = document.querySelector("input#password").value;

  const redirect_login = window.sessionStorage.getItem("redirect_login") || "myCrafts.html";

  if (nome.length < 1) {
    alertCraft('Preencha o Nome do seu usuário!');
  } else {
    if (email.length < 5) {
      alertCraft('Preencha o seu Email!');
    } else {
      db.collection("craftUsers")
        .where("email", "==", email)
        .get()
        .then((querySnapshot) => {
          if (querySnapshot.size == 0) {
            db.collection("craftUsers")
              .add({
                nome,
                email,
                password,
              })
              .then((doc) => {
                window.sessionStorage.setItem("craft_user_logger", doc.id);
                window.sessionStorage.setItem("craft_user_name", nome);
                window.sessionStorage.removeItem("redirect_login");
                alertCraftRedirect("Seja Bem vindo!", redirect_login);
              });
          } else {
            alertCraft("Email já cadastrado!");
          }
        })
        .catch((error) => {
          console.log(error);
          alertCraft("Erro no login: ", error);
        });
    }
  }
}

function logDataUser() {
  const email = document.querySelector("input#email").value;
  const password = document.querySelector("input#password").value;

  const redirect_login = window.sessionStorage.getItem("redirect_login") || "index.html";

  if (email.length < 5) {
    alertCraft('Preencha o seu Email!');
  } else {  
    db.collection("craftUsers")
      .where("email", "==", email)
      .where("password", "==", password)
      .get()
      .then((querySnapshot) => {
        if (querySnapshot.size > 0) {
          querySnapshot.forEach((doc) => {
            window.sessionStorage.setItem("craft_user_logger", doc.id);
            window.sessionStorage.setItem("craft_user_name", doc.data().nome);
            window.sessionStorage.removeItem("redirect_login");
            location.href = redirect_login;
          });
        } else {
          alertCraft("Senha inválida ou E-mail não cadastrado.");
        }
      })
      .catch((error) => {
        console.log(error);
        alertCraft("Erro no login, atualize a página e tente novamente.");
      });
  }
}

function getNameCraft() {
  if (window.sessionStorage.getItem("craft_user_name")) {
    return window.sessionStorage.getItem("craft_user_name");
  }
  return "";
}

function logout() {
  window.sessionStorage.removeItem("craft_user_logger");
  window.sessionStorage.removeItem("craft_user_name");

  alertCraftRedirect("Tchau até a próxima", "index.html");
}

function deleteCraft(id) {
  db.collection("craftArts")
    .doc(id)
    .delete()
    .then(() => {
      alertCraftRedirect("Craft apagado com sucesso!", "myCrafts.html");
    })
    .catch((error) => {
      alertCraft("Erro ao deletar: ", error);
    });
}

function alertCraft( message ) {
  const modal = document.getElementById('CraftModal');
  modal.classList.remove("block-modal");
  if (modal) {
    modal.addEventListener('show.bs.modal', function (event) {
      const title = modal.querySelector('.modal-body');
      title.innerHTML = message;
    });

    modal.addEventListener('click', function (event) {
      const button = modal.querySelector('#ok');
      button.click();
    });

    var myModal = new bootstrap.Modal(document.getElementById('CraftModal'));
    myModal.show();
  }
}

function alertCraftRedirect( message, redirect ) {
  const modal = document.getElementById('CraftModal');
  if (modal) {
    modal.addEventListener('show.bs.modal', function (event) {
      const title = modal.querySelector('.modal-body');
      title.innerHTML = message;

      const button = modal.querySelector('#ok');
      button.addEventListener('click', function (event) {
        location.href = redirect;
      });
    });

    var myModal = new bootstrap.Modal(document.getElementById('CraftModal'));
    myModal.show();
  }
}