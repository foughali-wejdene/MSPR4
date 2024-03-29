
import 'package:flutter/material.dart';
import 'package:flutter_test/flutter_test.dart';
import 'package:mspr/Feature/Login%20Screen/Login_Screen.dart';

import 'package:mspr/main.dart';
import 'dart:core';

void main() {
  testWidgets('Test de lancement de l\'application', (WidgetTester tester) async {
    // Construire l'application
    await tester.pumpWidget(const MyApp());

    // Vérifier que l'écran de connexion est affiché
    expect(find.byType(LoginScreen), findsOneWidget);
  });
}
