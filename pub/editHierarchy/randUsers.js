function randUsers(acc_manager, number) {
    let acc = acc_manager;
    for (let i = 0; i < number; i++) {
        let N = Math.floor(Math.random() * 100);
        let email = "user" + String(N) + "@example.com";
        let pass = "pass" + String(N);
        acc.addAccount(email, pass);
        if (N % i == 0)
            acc.setHierarchy(email, "mod");
        else if (N % i == 5)
            acc.setHierarchy(email, "admin");
    }
};

exports.randUsers = randUsers;