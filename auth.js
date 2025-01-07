const usersKey = 'users';

// Хеширование пароля (простое для примера)
function hashPassword(password) {
    let hash = 0;
    for (let i = 0; i < password.length; i++) {
        hash = (hash << 5) - hash + password.charCodeAt(i);
    }
    return String(hash);
}
function generateSalt() {
    return Math.random().toString(36).substring(2, 15) + Math.random().toString(36).substring(2, 15);
}

function hashPasswordWithSalt(password, salt) {
    return hashPassword(password + salt);
}
// Регистрация пользователя
document.querySelector('#register-form')?.addEventListener('submit', function(event) {
    event.preventDefault();

    const name = document.querySelector('#register-name').value;
    const email = document.querySelector('#register-email').value;
    const password = document.querySelector('#register-password').value;

    const users = JSON.parse(localStorage.getItem(usersKey) || '[]');

    if(users.find(user => user.email === email)) {
      document.querySelector('#register-error').textContent = "Пользователь с таким email уже существует.";
        return;
    }
    const salt = generateSalt()
    const newUser = {
        id: Date.now(),
        name: name,
        email: email,
         salt: salt,
        password: hashPasswordWithSalt(password, salt),
        avatar: 'images/default-avatar.png',
         description: ''
    };

     users.push(newUser);
    localStorage.setItem(usersKey, JSON.stringify(users));

      document.querySelector('#register-error').textContent = '';
    window.location.href = 'login.html';
});


// Вход пользователя
document.querySelector('#login-form')?.addEventListener('submit', function(event) {
    event.preventDefault();

    const email = document.querySelector('#login-email').value;
    const password = document.querySelector('#login-password').value;
    const users = JSON.parse(localStorage.getItem(usersKey) || '[]');


    const user = users.find(user => user.email === email && hashPasswordWithSalt(password,user.salt) === user.password);

    if(user) {
        localStorage.setItem('currentUser', JSON.stringify(user
            const usersKey = 'users';

// Хеширование пароля (простое для примера)
function hashPassword(password) {
    let hash = 0;
    for (let i = 0; i < password.length; i++) {
        hash = (hash << 5) - hash + password.charCodeAt(i);
    }
    return String(hash);
}
function generateSalt() {
    return Math.random().toString(36).substring(2, 15) + Math.random().toString(36).substring(2, 15);
}

function hashPasswordWithSalt(password, salt) {
    return hashPassword(password + salt);
}
// Регистрация пользователя
document.querySelector('#register-form')?.addEventListener('submit', async function(event) {
    event.preventDefault();

    const name = document.querySelector('#register-name').value;
    const email = document.querySelector('#register-email').value;
    const password = document.querySelector('#register-password').value;
    const salt = generateSalt()
    const hashedPassword =  hashPasswordWithSalt(password, salt)
        try {
            const response = await fetch('http://localhost:3000/register', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                 body: JSON.stringify({ name, email, password:hashedPassword, salt }),
            });

           if(response.ok) {
                window.location.href = 'login.html';
           } else {
            const data = await response.json()
            document.querySelector('#register-error').textContent = data.message;
           }
        } catch (error) {
            console.error('Error registering user:', error);
             document.querySelector('#register-error').textContent = "Ошибка регистрации пользователя";
        }
});


// Вход пользователя
document.querySelector('#login-form')?.addEventListener('submit', async function(event) {
    event.preventDefault();

    const email = document.querySelector('#login-email').value;
    const password = document.querySelector('#login-password').value;
       try {
           const response = await fetch('http://localhost:3000/login', {
               method: 'POST',
               headers: {
                  'Content-Type': 'application/json'
               },
                body: JSON.stringify({email, password})
            });

           if(response.ok){
               const data = await response.json()
               localStorage.setItem('currentUser', JSON.stringify(data.user));
               document.querySelector('#login-error').textContent = '';
               window.location.href = 'profile.html';
           } else {
               const data = await response.json();
            document.querySelector('#login-error').textContent = data.message;
           }
       }catch (error) {
         console.error('Error logging in user', error);
         document.querySelector('#login-error').textContent = 'Ошибка при входе в систему';
       }
});

// Проверка авторизации (на странице профиля)
function checkAuth() {
    const currentUser = localStorage.getItem('currentUser');
    if (!currentUser) {
      window.location.href = 'login.html';
    }
}
// Выход из профиля
function logout() {
    localStorage.removeItem('currentUser');
    window.location.href = 'login.html';
}