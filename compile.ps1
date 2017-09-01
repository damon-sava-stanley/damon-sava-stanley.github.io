Get-ChildItem "blogs/" -Filter *.md | Foreach-Object {
  $output="blogs/html/$_" -replace ".md", ".html"
  pandoc blogs/$_ --template=template.html --toc -o $output
}
pandoc blog.md --template=template.html --toc -o blog.html