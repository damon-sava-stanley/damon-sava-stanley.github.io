$tex=0;
$json = cat 'built.json' | ConvertFrom-Json

$writes = @{}

$json.psobject.properties | Foreach { $writes[$_.Name] = $_.Value }

$unix = Get-Date -Date "01/01/1970"

Get-ChildItem "blogs/" -Filter *.md | Foreach-Object {
  $last_write = (New-TimeSpan -Start $unix -End $_.LastWriteTime).TotalSeconds
  $previous_write = $writes[$_.Name]
  if (!$previous_write -or ($previous_write -lt $last_write)) {
    $dir="pages/$_" -replace ".md", ""
    if(!(Test-Path -Path $dir)) {
      mkdir $dir
    }
    $html="$dir/index.html"
    $pdf="$dir/index.pdf"
    pp -en -html "blogs/$_" | pandoc --template=template.html --toc --filter pandoc-citeproc -o "$html"
    if ($tex) {
      pp -en -pdf "blogs/$_" | pandoc --toc --filter pandoc-citeproc -o "$pdf"
    }
  }


  $writes[$_.Name] = $last_write
}

ConvertTo-Json $writes | Out-File -FilePath 'built.json'

rm -r tex2pdf.*/ 
pandoc blog.md --template=template.html --toc -o blog.html
pandoc index.md --template=template.html --toc -o index.html