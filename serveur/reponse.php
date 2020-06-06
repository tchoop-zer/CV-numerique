<html>
    <body>
        <?php echo '<p>merci pour votre message,<br>
         une reponse vous sera communiqué sous peu.</p>'; 


		$link = new PDO('mysql:host=localhost;dbname=cv_lucas', 'root', '', array(PDO::MYSQL_ATTR_INIT_COMMAND => "SET NAMES utf8"));

        
		echo $_GET['contact_eric'];

        echo $_POST['contact_nom'].' | '.$_POST['contact_prenom'].' | '.$_POST['email'].' | '.$_POST['comment'];

         

			//insertion de la donné dans la base !

	// lancement de la requete
    //$sql = 'INSERT INTO liste_proprietaire VALUES("", "tibo", "06-98-42-01-36")';
	


	$sql = 'INSERT INTO formulaire VALUES ("'.$_POST["contact_nom"].'","'. $_POST["contact_prenom"].'","'.  $_POST["email"] .'","'.  $_POST["comment"]. '")';
	//echo "Mon SQL=" .$sql;

// on insere le tuple (mysql_query) et au cas où, on écrira un petit message d'erreur si la requête ne se passe pas bien (or die)
//mysql_query ($sql) or die ('Erreur SQL !'.$sql.'<br />'.mysql_error());
// on ferme la connexion à la base
//mysql_close();

	


	$req = $link -> prepare($sql);
	$req -> execute();


         ?>
    </body>
</html>