while ($true) {
  Get-ChildItem "blogs/" -Filter *.md | Foreach-Object {
    $bib="blogs/$_" -replace ".md", ".bib"
    $html="blogs/html/$_" -replace ".md", ".html"
    $pdf="blogs/html/$_" -replace ".md", ".pdf"
    ./gpp.exe -H -DHTML=1 -o tmp.md blogs/$_
    pandoc tmp.md --template=template.html --toc --bibliography=$bib -o $html
    rm tmp.md
    ./gpp.exe -H -DTEX=1 -o tmp.md blogs/$_
    pandoc tmp.md --toc --bibliography=$bib -o $pdf
    rm tmp.md
  }
  pandoc blog.md --template=template.html --toc -o blog.html
  sleep 30
}