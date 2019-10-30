function allow(permissions, role){
    return permissions.split(',').includes(role);
}

export { allow };
