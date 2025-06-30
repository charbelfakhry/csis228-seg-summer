
const fs = require('fs');
const path = require('path');
const filePath = path.join(__dirname, '../data/users.json');

class UserRepository{

    constructor() {
        this.users = JSON.parse(fs.readFileSync(filePath, 'utf8'));
    }
    
    getAll(){
        return this.users;
    }

    getById(id) {
        return this.users.find(user => user.id == id);
    }

    add(user) {
        this.users.push(user);
        fs.writeFileSync(filePath, JSON.stringify(this.users, null, 2));
    }

}

module.exports = UserRepository;