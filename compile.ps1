param([switch] $tex)

while ($true) {
  Get-ChildItem "blogs/" -Filter *.md | Foreach-Object {
    $bib="blogs/$_" -replace ".md", ".bib"
    $html="blogs/html/$_" -replace ".md", ".html"
    $pdf="blogs/html/$_" -replace ".md", ".pdf"
    ./pp.exe -en -html "blogs/$_" | pandoc --template=template.html --toc --bibliography="$bib" -o "$html"
    if ($tex) {
      ./pp.exe -en -pdf "blogs/$_" | pandoc --toc --bibliography="$bib" -o "$pdf"
    }
  }

  Get-ChildItem "slides/" -Filter *.md | Foreach-Object {
    $bib="slides/$_" -replace ".md", ".bib"
    $html="slides/html/$_" -replace ".md", ".html"
    $pdf="slides/html/$_" -replace ".md", ".pdf"
    ./pp.exe -en -html slides/$_ | pandoc -t revealjs -s -V revealjs-url=reveal --bibliography="$bib" -o "$html" --include-in-header=reveal.css.html
    rm tmp.md
    if ($tex) {
      ./pp.exe -en -pdf slides/$_ | pandoc -t tmp.md --bibliography="$bib" -o "$pdf"
    }
  }

  rm -r tex2pdf.*/ 
  pandoc blog.md --template=template.html --toc -o blog.html
  sleep 30
}