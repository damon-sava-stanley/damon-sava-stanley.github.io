$tex=0;

Get-ChildItem "blogs/" -Filter *.md | Foreach-Object {
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

rm -r tex2pdf.*/ 
pandoc blog.md --template=template.html --toc -o blog.html
pandoc index.md --template=template.html --toc -o index.html