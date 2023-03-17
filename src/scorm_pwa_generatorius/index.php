<?php
	function make_seed()
	{
   		list($usec, $sec) = explode(' ', microtime());
   		return (float) $sec + ((float) $usec * 100000);
	}
     
	function sendArchive( $post )
	{
		mt_srand(make_seed());
        $rseed=mt_rand(1,999);
		copy("template.zip","shells/scormpackage".$rseed.".zip");

		$fileContents = file_get_contents("imslrm.xml");
		$newcontents=str_replace("{{COURSE_TITLE}}", $post["c_title"], $fileContents);
		$newcontents=str_replace("{{TASK_TITLE}}", $post["t_title"], $newcontents);
		$newcontents=str_replace("{{TASK_DESCRIPTION}}", $post["t_descr"], $newcontents);
		$newcontents=str_replace("{{TASK_AUTHOR}}", $post["t_author"], $newcontents);
		$fileName = "shells/imslrm.xml";
		$fd = fopen ($fileName, "w");
		$out = fwrite ($fd, $newcontents);
		fclose ($fd);

		$fileContents = file_get_contents("imsmanifest.xml");
		$newcontents=str_replace("{{TASK_ID}}", $post["t_id"], $fileContents);
		$newcontents=str_replace("{{TASK_TITLE}}", $post["t_title"], $newcontents);
		$newcontents=str_replace("{{PASSING_SCORE}}", $post["p_score"], $newcontents);
		$fileName = "shells/imsmanifest.xml";
		$fd = fopen ($fileName, "w");
		$out = fwrite ($fd, $newcontents);
		fclose ($fd);

		$fileContents = file_get_contents("task.xml");
		$newcontents=str_replace("{{TASK_TITLE}}", $post["t_title"], $fileContents);
		$newcontents=str_replace("{{TASK_DESCRIPTION}}", $post["t_descr"], $newcontents);	
		$newcontents=str_replace("{{TASK_EXAMPLE}}", $post["t_example"], $newcontents);	
		$newcontents=str_replace("{{TASK_SKELETON}}", $post["t_skeleton"], $newcontents);	
		$fileName = "shells/task.xml";
		$fd = fopen ($fileName, "w");
		$out = fwrite ($fd, $newcontents);
		fclose ($fd);

		$fileContents = file_get_contents("inhtml.html");
		$newcontents=str_replace("{{TASK_TITLE}}", $post["t_title"], $fileContents);
		$fileName = "shells/inhtml.html";
		$fd = fopen ($fileName, "w");
		$out = fwrite ($fd, $newcontents);
		fclose ($fd);

		$fileContents = file_get_contents("manifest.json");
		$newcontents=str_replace("{{TASK_TITLE}}", $post["t_title"], $fileContents);
		$newcontents=str_replace("{{SHORT_TITLE}}", $post["s_title"], $newcontents);
		$fileName = "shells/manifest.json";
		$fd = fopen ($fileName, "w");
		$out = fwrite ($fd, $newcontents);
		fclose ($fd);

		$xw = xmlwriter_open_memory();
		xmlwriter_set_indent($xw, 1);
		$res = xmlwriter_set_indent_string($xw, ' ');

		xmlwriter_start_document($xw, '1.0', 'UTF-8');
		xmlwriter_start_element($xw, 'tests');

		$el_number = 0;
		foreach ($post["input"] as $input) {

			xmlwriter_start_element($xw, 'test');
			xmlwriter_start_attribute($xw, 'id');
			xmlwriter_text($xw, 'test_'.($el_number+1));
			xmlwriter_end_attribute($xw);

			xmlwriter_start_element($xw, 'input');
			xmlwriter_write_cdata($xw, $input);
			xmlwriter_end_element($xw); // input

			xmlwriter_start_element($xw, 'output');
			xmlwriter_write_cdata($xw, $post["output"][$el_number]);
			xmlwriter_end_element($xw); // output

			xmlwriter_end_element($xw); // test_1
			$el_number++;			
		}

		xmlwriter_end_element($xw); // tests

		xmlwriter_end_document($xw);
		$test_contents = xmlwriter_output_memory($xw);

		$fileName = "shells/tests.xml";
		$fd = fopen ($fileName, "w");
		$out = fwrite ($fd, $test_contents);
		fclose ($fd);

		$zip = new ZipArchive;
		if ($zip->open("shells/scormpackage".$rseed.".zip") === TRUE) {
		    $zip->addFile('shells/imslrm.xml', 'imslrm.xml');
		    $zip->addFile('shells/imsmanifest.xml', 'imsmanifest.xml');
		    $zip->addFile('shells/task.xml', 'task/task.xml');
		    $zip->addFile('shells/tests.xml', 'task/tests.xml');
		    $zip->addFile('shells/inhtml.html', 'index.html');
		    $zip->addFile('shells/manifest.json', 'manifest.json');
		    $zip->close();
		} else {
		}

		ob_end_clean();
  		header("Content-type: application/zip"); 
		header("Content-disposition: attachment; filename=scorm_pckg.zip");
        header("Content-Transfer-Encoding: binary");
        header("Content-Length: ".filesize("shells/scormpackage".$rseed.".zip"));
		readfile("shells/scormpackage".$rseed.".zip");  		
	}

	$vars=$_REQUEST;
	$rezult="No operation selected";
	if( isset( $vars['mod'] ) && $vars['mod'] == 'makescorm' ) {
		sendArchive($_POST);
	} else {
?>
<!DOCTYPE html>
<html>
<head>
	<meta charset="UTF-8">
	<!--favicon-->
	<link rel="icon" href="assets/images/favicon-32x32.png" type="image/png" />
	<!--plugins-->
	<link href="assets/plugins/simplebar/css/simplebar.css" rel="stylesheet" />
	<link href="assets/plugins/perfect-scrollbar/css/perfect-scrollbar.css" rel="stylesheet" />
	<link href="assets/plugins/metismenu/css/metisMenu.min.css" rel="stylesheet" />
	<!-- loader-->
	<link href="assets/css/pace.min.css" rel="stylesheet" />
	<script src="assets/js/pace.min.js"></script>
	<!-- Bootstrap CSS -->
	<link rel="stylesheet" href="assets/css/bootstrap.min.css" />
	<!-- Icons CSS -->
	<link rel="stylesheet" href="assets/css/icons.css" />
	<!-- App CSS -->
	<link rel="stylesheet" href="assets/css/app.css" />

    <link rel="stylesheet" type="text/css" href="assets/css/codemirror.css">
    <link rel="stylesheet" type="text/css" href="assets/css/skulptide.css"> 
    <link rel="stylesheet" type="text/css" href="assets/css/dracula.css">

</head>
<body class="bg-theme bg-theme1">
	<form action="index.php" method="post">
	<div class="wrapper">
		<div class="card radius-15">
			<div class="card-body">
				<div class="card-title">
					<h4 class="mb-0">SCORM / PWA paketo kūrimas</h4>
				</div>
				<hr/>

				<div class="form-group">
					<label>Kurso pavadinimas</label>
					<div class="input-group">
						<div class="input-group-prepend">	
							<span class="input-group-text"><i class='bx bx-phone'></i></span>
						</div>
						<input type="text" name="c_title" class="form-control border-left-0" placeholder="Pitono mokymai" value="Pitono mokymai">
					</div>
				</div>

				<div class="form-group">
					<label>Užduoties pavadinimas</label>
					<div class="input-group">
						<div class="input-group-prepend">	
							<span class="input-group-text"><i class='bx bx-phone'></i></span>
						</div>
						<input type="text" name="t_title" class="form-control border-left-0" placeholder="Užduoties pavadinimas">
					</div>
				</div>

				<div class="form-group">
					<label>Trumpas užduoties pavadinimas (tai bus programos pavadinimas)</label>
					<div class="input-group">
						<div class="input-group-prepend">	
							<span class="input-group-text"><i class='bx bx-phone'></i></span>
						</div>
						<input type="text" name="s_title" class="form-control border-left-0" placeholder="Užduoties pavadinimas">
					</div>
				</div>

				<div class="form-group">
					<label>Užduoties aprašymas</label>
					<textarea id="mytextarea" class="htmlarea" name="t_descr">Užduoties aprašymas</textarea>
				</div>

				<div class="form-group">
					<label>Įvesties, išvesties pavyzdžiai</label>
					<textarea id="mytextarea" class="htmlarea" name="t_example">Įvesties, išvesties pavyzdžiai</textarea>
				</div>

				<div class="form-group">
					<label>Pradinės programos skeletas</label>
					<textarea class="simplearea" id="skeleton" name="t_skeleton"># Toliau rašykite kodą...</textarea>
				</div>

				<div class="form-group">
					<label>Autorius</label>
					<div class="input-group">
						<div class="input-group-prepend">	
							<span class="input-group-text"><i class='bx bx-phone'></i></span>
						</div>
						<input type="text" name="t_author" class="form-control border-left-0" placeholder="Vardas ir pavardė">
					</div>
				</div>

				<div class="form-group">
					<label>Unikalus užduoties identifikatorius (jis turi būti be tarpų ir diakritinių ženklų)</label>
					<div class="input-group">
						<div class="input-group-prepend">	
							<span class="input-group-text"><i class='bx bx-phone'></i></span>
						</div>
						<input type="text" name="t_id" class="form-control border-left-0" placeholder="Unikalus_uzduoties_id">
					</div>
				</div>

				<div class="form-group">
					<label for="formControlRange">Įveikimo procentas</label>
					<input type="range" name="p_score" class="form-control-range" id="formControlRange">
				</div>

				<div class="form-group">
					<label>Testai</label>
				</div>

				<div id="tests">
					<div id="test_template" class="input-group">
						<div class="input-group-prepend">	
							<span class="input-group-text">Įvestis ir atsakymas</span>
						</div>
						<input type="text" aria-label="Input" name="input[]" class="form-control">
						<input type="text" aria-label="Output" name="output[]" class="form-control">
					</div>
				</div>

				<br />

				<div class="form-group">
					<button type="button" class="btn btn-light px-5" onclick="addTest()">Pridėti testą</button>
				</div>

				<br />

				<div class="form-group">
					<button type="submit" value="Daryti" class="btn btn-light px-5">Sukonstruoti ir atsisiųsti paketą</button>
				</div>

				<input type="hidden" name="mod" value="makescorm">

			</div>
		</div>
	</div>
	</form>

	<script>

		function addTest() {
			const node = document.getElementById("test_template");
			const clone = node.cloneNode(true);
			document.getElementById("tests").appendChild(clone);
  		}

	    function createEditor(codeId) {
	        var textarea = document.getElementById(codeId);
	        editor = CodeMirror.fromTextArea(textarea, {
	            mode: {name: "python",
	                   version: 2,
	                   singleLineStringErrors: false
	               },
	            lineNumbers: true,
	            textWrapping: false,
	            indentUnit: 4,
	            indentWithTabs: true,
	            fontSize: "10pt",
	            autoMatchParens: true,
	            matchBrackets: true,
	            theme: "dracula",
	            extraKeys:{
	                Tab: function (cm) {
	                    if (cm.doc.somethingSelected()) {
	                        return CodeMirror.Pass;
	                    }
	                    var spacesPerTab = cm.getOption("indentUnit");
	                    var spacesToInsert = spacesPerTab - (cm.doc.getCursor("start").ch % spacesPerTab);    
	                    var spaces = Array(spacesToInsert + 1).join(" ");
	                    cm.replaceSelection(spaces, "end", "+input");
	                }
	            }
	        });
	    }

	</script>

	<script src="assets/js/jquery.min.js"></script>
	<script src="assets/js/popper.min.js"></script>
	<script src="assets/js/bootstrap.min.js"></script>
    <script src="assets/js/codemirror.js"></script>
    <script src="assets/js/matchbrackets.js"></script>

	<script src="assets/plugins/simplebar/js/simplebar.min.js"></script>
	<script src="assets/plugins/metismenu/js/metisMenu.min.js"></script>
	<script src="assets/plugins/perfect-scrollbar/js/perfect-scrollbar.js"></script>
	<script src="https://cdn.tiny.cloud/1/o1ozg5x32wmuacijibeivks6myok4xxn07kutpo3d4lbkus1/tinymce/6/tinymce.min.js" referrerpolicy="origin"></script>

	<script>
		tinymce.init({
			selector: '.htmlarea'
		});
		createEditor("skeleton");
	</script>

</body>
</html>

<?php } ?>