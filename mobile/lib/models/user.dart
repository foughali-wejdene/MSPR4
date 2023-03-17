class User {
  String id;
  String name;
  String createdAt;
  String username;
  String firstName;
  String lastName;
  Map<String, dynamic>? address;
  Map<String, dynamic>? profile;
  Map<String, dynamic>? company;
  String? email;
  List<dynamic>? orders;

  User(
      {required this.id,
      required this.name,
      required this.username,
      required this.firstName,
      required this.lastName,
      required this.createdAt,
      this.email,
      this.address,
      this.profile,
      this.company,
      this.orders});

  User.fromMap(Map map)
      : this(
            id: map['id'],
            name: map['name'],
            username: map['username'],
            createdAt: map['createdAt'],
            firstName: map['firstName'],
            lastName: map['lastName'],
            email: map['email'],
            address: map['address'],
            profile: map['profile'],
            company: map['company'],
            orders: map['orders']);

  Map<String, dynamic> asMap() => {
        'id': id,
        'name': name,
        'firstName': firstName,
        'createdAt': createdAt,
        'lastName': lastName,
        'email': email,
        'username': username,
        'address': address,
        'profile': profile,
        'company': company,
        'orders': orders
      };
}
