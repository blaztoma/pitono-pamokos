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
	<div class="wrapper">
		<div class="card radius-15">
			<div class="card-body">
				<div class="card-title">
					<h4 class="mb-0" style="float: left;">SCORM / PWA paketo kūrimas</h4>
	                <form action="index.php" method="post" enctype="multipart/form-data" style="float: right;">  
	                    <input type="button" name="btn_upload" class="btn btn-light px-5" onclick="selectFile();" value="Įkelti Zip failą korekcijoms" />  
	                    <input type="file" name="zip_file" id="zip_file" onchange="submit()" style="visibility:hidden;display:none;" />
						<input type="hidden" name="mod" value="uploadscorm">
	                </form>  
				</div>
				<hr style="margin-top: 4rem;clear: both;" />

				<form action="index.php" method="post">
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
							<input type="text" name="t_title" class="form-control border-left-0" placeholder="Užduoties pavadinimas" value="<?=$_taskTitle?>" >
						</div>
					</div>

					<div class="form-group">
						<label>Trumpas užduoties pavadinimas (tai bus programos pavadinimas)</label>
						<div class="input-group">
							<div class="input-group-prepend">	
								<span class="input-group-text"><i class='bx bx-phone'></i></span>
							</div>
							<input type="text" name="s_title" class="form-control border-left-0" placeholder="Užduoties trumpas pavadinimas" value="<?=$_shortTitle?>" >
						</div>
					</div>

					<div class="form-group">
						<label>Užduoties aprašymas</label>
						<textarea id="mytextarea" class="htmlarea" name="t_descr"><?=$_taskDescription?></textarea>
					</div>

					<div class="form-group">
						<label>Įvesties, išvesties pavyzdžiai</label>
						<textarea id="mytextarea" class="htmlarea" name="t_example"><?=$_taskExample?></textarea>
					</div>

					<div class="form-group">
						<label>Pradinės programos skeletas</label>
						<textarea class="simplearea" id="skeleton" name="t_skeleton"><?=$_taskSkeleton?></textarea>
					</div>

					<div class="form-group">
						<label>Autorius</label>
						<div class="input-group">
							<div class="input-group-prepend">	
								<span class="input-group-text"><i class='bx bx-phone'></i></span>
							</div>
							<input type="text" name="t_author" class="form-control border-left-0" placeholder="Vardas ir pavardė" value="<?=$_taskAuthor?>" >
						</div>
					</div>

					<div class="form-group">
						<label>Unikalus užduoties identifikatorius (jis turi būti be tarpų ir diakritinių ženklų)</label>
						<div class="input-group">
							<div class="input-group-prepend">	
								<span class="input-group-text"><i class='bx bx-phone'></i></span>
							</div>
							<input type="text" name="t_id" class="form-control border-left-0" placeholder="Unikalus_uzduoties_id" value="<?=$_taskId?>" >
						</div>
					</div>

					<div class="form-group">
						<label for="formControlRange">Įveikimo procentas</label>
						<input type="range" name="p_score" class="form-control-range" id="formControlRange" value="<?=$_taskScore?>" >
					</div>

					<div class="form-group">
						<label>Testai</label>
					</div>

					<div id="tests">
						<?php
						if($_tests->test) {
							foreach ($_tests->test as $ctest) {
								?>
								<div id="test_template" class="input-group">
									<div class="input-group-prepend">	
										<span class="input-group-text">Įvestis ir atsakymas</span>
									</div>
									<?php
									echo '<input type="text" aria-label="Input" name="input[]" class="form-control" value="' . (string) $ctest->input . '">';
									echo '<input type="text" aria-label="Input" name="output[]" class="form-control" value="' . (string) $ctest->output . '">';
								echo '</div>';
							}
						} else { ?>
							<div id="test_template" class="input-group">
								<div class="input-group-prepend">	
									<span class="input-group-text">Įvestis ir atsakymas</span>
								</div>
								<input type="text" aria-label="Input" name="input[]" class="form-control">
								<input type="text" aria-label="Output" name="output[]" class="form-control">
							</div>
						<?php
						}
						?>
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

				</form>

			</div>
		</div>
	</div>
	</form>

	<script>

		function selectFile() {
			$('input[type="file"]').click();
		}

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