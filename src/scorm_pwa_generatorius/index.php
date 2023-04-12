<?php
	$_taskTitle = "";
	$_shortTitle = "";
	$_taskDescription = "Užduoties aprašymas";
	$_taskExample = "Įvesties, išvesties pavyzdžiai.";
	$_taskSkeleton = "# Toliau rašykite kodą...";
	$_taskAuthor = "";
	$_taskId = "";
	$_taskScore = "50";
	$_shortTitle = "";

	function make_seed()
	{
   		list($usec, $sec) = explode(' ', microtime());
   		return (float) $sec + ((float) $usec * 100000);
	}

	function sanitizeInput($str) {
        $allowedElements = [
            'p',
            'br',
            'b',
            'strong',
            'i',
            'em',
            's',
            'u',
            'ul',
            'ol',
            'li',
            'span',
            'table',
            'tbody',
            'tr',
            'td'
        ];
        return strip_tags($str, $allowedElements);
	}

	function uploadArchive( $post )
	{
		global $_taskTitle;
		global $_shortTitle;
		global $_taskDescription;
		global $_taskExample;
		global $_taskSkeleton;
		global $_taskAuthor;
		global $_taskId;
		global $_taskScore;
		global $_shortTitle;
		global $_tests;

		if($_FILES['zip_file']['name'] != '')  
		{  
			$file_name = $_FILES['zip_file']['name'];  
			$array = explode(".", $file_name);  
			$name = $array[0];  
			$ext = $array[1];  
			if($ext == 'zip')  
			{  	   		
		   		$zip = new ZipArchive;
				$zip->open($_FILES['zip_file']['tmp_name']);
				$taskData = $zip->getFromName('task/task.xml');
				$taskObject = new SimpleXMLElement($taskData);
				$_taskTitle = sanitizeInput($taskObject->title);
				$_taskDescription = sanitizeInput($taskObject->description);
				$_taskExample = sanitizeInput($taskObject->example);
				$_taskSkeleton = sanitizeInput($taskObject->skeleton);
				$_taskId = sanitizeInput($taskObject["id"]);
				$_taskAuthor = sanitizeInput($taskObject->author);
				$_taskScore = sanitizeInput($taskObject->score);
				$_shortTitle = sanitizeInput($taskObject->short);

				$testData = $zip->getFromName('task/tests.xml');
				$testObject = new SimpleXMLElement($testData);
				$_tests = $testObject;
			}  
		} 		
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
		$newcontents=str_replace("{{SHORT_TITLE}}", $post["s_title"], $newcontents);	
		$newcontents=str_replace("{{TASK_DESCRIPTION}}", $post["t_descr"], $newcontents);	
		$newcontents=str_replace("{{TASK_EXAMPLE}}", $post["t_example"], $newcontents);	
		$newcontents=str_replace("{{TASK_SKELETON}}", $post["t_skeleton"], $newcontents);	
		$newcontents=str_replace("{{TASK_ID}}", $post["t_id"], $newcontents);	
		$newcontents=str_replace("{{TASK_AUTHOR}}", $post["t_author"], $newcontents);	
		$newcontents=str_replace("{{PASSING_SCORE}}", $post["p_score"], $newcontents);	
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
	} else if (isset( $vars['mod'] ) && $vars['mod'] == 'uploadscorm') {
		uploadArchive($_POST);
		include_once("html.php");
	} else {
		include_once("html.php");
	}

?>