$tex=0;
$json = cat 'built.json' | ConvertFrom-Json

$writes = @{}

$json.psobject.properties | Foreach { $writes[$_.Name] = $_.Value }

$unix = Get-Date -Date "01/01/1970"

Get-ChildItem "blogs/" -Filter *.md | Foreach-Object {
  $last_write = (New-TimeSpan -Start $unix -End $_.LastWriteTime).TotalSeconds
  $name=$_.Name
  $previous_write = $writes[$name]
  if (!$previous_write -or ($previous_write -lt $last_write)) {
    $dir="pages/$name" -replace ".md", ""
    if(!(Test-Path -Path $dir)) {
      mkdir $dir
    }
    $html="$dir/index.html"
    $pdf="$dir/index.pdf"
    if (Get-Command "pp" -errorAction SilentlyContinue) {
      pandoc -s --template=template.html --toc --mathjax --filter pandoc-citeproc -o "$html" "$_" 
      if ($tex) {
        pp -en -pdf "blogs/$_" | pandoc -s --toc --filter pandoc-citeproc -o "$pdf"
      }
    } else {
      pandoc -s --template=template.html --toc --mathjax --filter pandoc-citeproc -o "$html" "$_"
      if ($tex) {
        cat "$_" | pandoc -s --toc --filter pandoc-citeproc -o "$pdf" 
      }
    }
  }
  $writes[$_.Name] = $last_write
}

ConvertTo-Json $writes | Out-File -FilePath 'built.json'

rm -r tex2pdf.*/ 
pandoc blog.md --template=template.html --toc -o blog.html
pandoc index.md --template=template.html --toc -o index.html