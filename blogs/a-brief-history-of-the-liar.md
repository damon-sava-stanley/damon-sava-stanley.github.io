---
title: A Brief History of the Liar
author: Damon Stanley
date: 2017-9-1
<#ifdef TEX>
header-includes:
    - \\usepackage{epigraph}
<#endif>
...

<#define epigraph|\>#1 -- #2>
<#ifdef HTML>
  <#define epigraph|<blockquote>#1 <footer class="blockquote-footer"><cite>#2</cite></footer></blockquote>>
<#endif>
<#ifdef TEX>
  <#define epigraph|\\epigraph{#1}{#2}>
<#endif>


<#epigraph One of themselves, even a prophet of their own, said, the
  Cretians are alway liars, evil beasts, slow bellies. This witness is true.|Epistles 1:12-13>

# Introduction

There is an old fable: a man enters a despotic land. Not knowing the customs
or politics of this place, he offends the local tyrant, who proclaims "What
kind of man are you? Speak: if you say falsely, you shall be hanged, but, if
you say truly, you shall not be hanged." The man considers his options for a
moment before replying, "Well, I'll be hanged."

Likely the man is hung either way as we should not hazard our chances with
tyrants, but perhaps logic will serve us fairer.

***

The key to solving any puzzle is to find its basic structure. That the story
concerns a man and a tyrant, that it concerns executions or speaking or events
at all is inessential to it. Let us find this core, step by step. First we
isolate the puzzling statements into a triple:

(@) If the man's statement is false, then he will be hanged.
(@) If the man's statement is true, then he will not be hanged.
(@) The man's statement is that he will be hanged.

Now we abstract away the specific content with the original trick: putting
letters in the place of parts of the sentence.

(@) If $S$ is false, then $H$.
(@) If $S$ is true, then is is not the case that $H$.
(@) $S$ is "$H$."

Presented like this, we can isolate what is puzzling about this. For because
$S$ is "$H$" we can "$H$" for $S$ and derive

(@) If "$H$" is false, then $H$.
(@) If "$H$" is true, then it is not the case that $H$.

Further relying on the principles that $H$ is true if and only if $H$ and that
$H$ is false if an only if it is not the case that $H$, we can further break
this down.

(@) If it is not the case that $H$, then $H$.
(@) If $H$, then it is not the case that $H$.

Putting these two together gives us

(@) $H$ if and only if it is not the case that $H$.

Which is a direct contradiction.

# The Greeks

Much the same exercise in abstraction and simplification that we just went
through occurred historically. As @sorensen2003Brief reports, the initial
kernel of the liar paradox owes to Epimenides, a seventh century B.C.E.
prophet who reportedly said, "The Cretans always lie." We can immediately
see some features of the statement that distract from the puzzle, namely
the references to "The Cretans" and, more subtly, the use of "lie."



# Bibliography