# windows-xp
Parcijalna replikacija windows xp-a


Arhitektura:
![Alt text](arhitektura.png?raw=true "Title")


*U docs folderu se nalazi dokumentacija.*

Instalacija:
1. Uneti odovarajuci username i password za pristup serveru u fajlu ./php/functions.js na linijima 4 i 5.
2. Kreirati tabelu "windowsxp" u bazi.
3. Smestiti aplikaciju u odgovarajuci folder ( primer: "www/xp",...)
3. Otvoriti u pretrazivacu fajl localhost/xp/php/setup.php
4. Pokrenuti aplikaciju localhost/xp/login/login.php


OPIS:
Parcijalna replikacija Windows XP:
Tri grupe korisnika: USER, ADMIN, GUEST dele jedan "kompjuter" zavisno od tipa korisnika, odgovarajuce dozvole imaju za rad sa fajlovima i administracijom korisnika.
Korisceni alati i tehnologije:
1. JS 
	1.1 Vannila: 99%
	1.2 JQuery: 1 linija koda
	1.3 JQueryUI: 1 linija koda 
2. PHP 
3. MySql
4. Wamp
		
Koriscene biblioteke:
1. jsPDF: generise pdf dokumente
	-ne radi bez interneta.
			
Ostatak je opisano ispod:

Koriscena arhitektura pri izradi sistema: MVC.
Videti arhitekturu na slici arhitektura.png.

Opis:

1. BAZA PODATAKA
	-GRUPE KORISNIKA (USER, ADMIN, GUEST)
	
WINDOWS XP:
Postoje tri grupe korisnika: 
	1. tip USER; kreira se u registracionoj formi
	2. tip GUEST; ubacen u bazu po inicijalizaciji baze sa username/password : guest/guest
	3. tip ADMIN; ubacen u bazu po inicijalizaciji sa username/password: admin/admin
	
2.  PRIJAVA NA SISTEM  sadrzi:
	1. formu za prijavu
  2. registracionu formu
	
3. RAZLICIT KORISNICKI INTERFEJS U ZAVISNOSTI OD TIPA KORISNIKA:
	1. tip ADMIN moze da:
		1.1 preimenuje 
		1.2 brise 
		1.3 izmenjuje 
		1.4 pravi nove fajlove
	2. tip USER moze da:
		2.1 preimenuje
		2.2 izmenjuje
		2.3 pravi nove fajlove
	3. tip GUEST moze da:
		3.1 samo cita fajlove
		
4.PRETRAZIVANJE PODATAKA 
	1. bilo kojim karakterom koji je u abecedi, oznacava se fajl na radnoj povrsini cije ime pocinje tim karakterom. 
  Pritiskom opet na isti karakter oznacava se sledeci fajl cije ime pocinje tim karakterom i tako dalje...
		
5. DINAMICKE TABELE
	5.1 paginacija je uradjena na sledeci nacin: ako baza sadrzi vise od 30 fajlova, ikonice postaju manje
	5.2 ukoliko korisnik klikne na opciju:
		Arrange By Name, on sortira ikone na radnoj povrsini

6. GENERISANJE IZVESTAJA
	Sve akcije:
	 6.1 pravljenje novog fajla
	 6.2 zatvaranje 
	 6.3 cuvanje
	 6.4 preimenovanje
	 6.5 brisanje fajla
	se registruju. Start-meni sadrzi dve "aplikacije" koje generisu pdf dokument.
	"Session report" - generise akcije koje su se zbivale u trenutnoj korisnickoj sesiji.
	"System report" - generise akcije koje su se zbivale od nastanka sistema.
	Za generisanje pdf izvestaja koriscena biblioteka: https://parall.ax/products/jspdf .
	
7. AJAX, JQuery, JQuery UI
	7.1 AJAX iskoriscena za asihrone zahteve prema serveru. Svaka akcija korisnika je vidljiva kako na frontend-u tako i backend-u. 
  Primer: brisanje fajla na frontend-u je ispraceno brisanje fajla u bazi.
  
	(JQuery, JQuery UI) iskorisceni za funkcionalnost prevlacenja ikonica i prozora ('draggable')
	
8. DEO ZA IZMENU PODATKA O KORISNIKU 
	8.1 svaki korisnik dobija fajl sa nazivom "config", u kome podesava svoj "username" i "password". Izmenom i cuvanjem fajla "config", server obradjuje ovaj fajl i menja odgovarajuci username i password u bazi
		
9. DEO ZA ADMINISTRACIJU KORISNIKA
	9.1 'admin' korisnik, manipulacijom fajla sa nazivom "admin" koji se nalazi na radnoj povrsini brise odgovarajuce korisnike tipa USER. 

	
