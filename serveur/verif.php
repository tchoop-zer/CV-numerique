<html>
    <body>
        <?php echo '<p>liste des commentaires.</p>'; 
         
         $link = new PDO('mysql:host=localhost;dbname=cv_lucas', 'root', '', array(PDO::MYSQL_ATTR_INIT_COMMAND => "SET NAMES utf8"));
// pour le serveur de l'UPEM, remplacer localhost par sqletud.u-pem.fr

$sql = "SELECT prenom, nom, mail, commentaire FROM formulaire";
// On prépare la requête avant l'envoi :
$req = $link -> prepare($sql);
$req -> execute();
// On crée une liste non numérotée avec les résultats
echo '<ul>';
while($data = $req -> fetch()){
  // On affiche chaque résultat sous forme d'un item de la liste
  echo '<li>'.$data['prenom'].' <b>'.$data['nom'].'</b> '.$data['mail'].' '.$data['commentaire'].'</li>';
}
$req = null;
echo '</ul>';
         ?>
    </body>
</html>