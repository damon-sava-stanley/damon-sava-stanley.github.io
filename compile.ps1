param([switch] $tex)

while ($true) {
  Get-ChildItem "blogs/" -Filter *.md | Foreach-Object {
    $bib="blogs/$_" -replace ".md", ".bib"
    $html="blogs/html/$_" -replace ".md", ".html"
    $pdf="blogs/html/$_" -replace ".md", ".pdf"
    ./gpp.exe -H -DHTML=1 -o tmp.md blogs/$_
    pandoc tmp.md --template=template.html --toc --bibliography=$bib -o $html
    rm tmp.md
    if ($tex) {
      ./gpp.exe -H -DTEX=1 -o tmp.md blogs/$_
      pandoc tmp.md --toc --bibliography=$bib -o $pdf
      rm tmp.md
    }
  }

  Get-ChildItem "slides/" -Filter *.md | Foreach-Object {
    $bib="slides/$_" -replace ".md", ".bib"
    $html="slides/html/$_" -replace ".md", ".html"
    $pdf="slides/html/$_" -replace ".md", ".pdf"
    ./gpp.exe -H -DHTML=1 -o tmp.md slides/$_
    pandoc -t revealjs -s -V revealjs-url=reveal-js tmp.md  --bibliography=$bib -o $html --include-in-header=reveal.css.html
    rm tmp.md
    if ($tex) {
      ./gpp.exe -H -DTEX=1 -o tmp.md slides/$_
     pandoc -t beamer tmp.md --bibliography=$bib -o $pdf
     rm tmp.md
    }
  }

  rm -r tex2pdf.*/ 
  pandoc blog.md --template=template.html --toc -o blog.html
  sleep 30
}