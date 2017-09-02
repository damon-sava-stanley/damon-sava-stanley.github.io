---
title: A Brief History of the Liar (pt. 1)
author: Damon Stanley
date: 2017-9-1
abstract: >
  This article provides a brief historical survey examining
  some of the ways the liar sentence has been fought against
  and with. Particular attention is paid to the formulation
  of the paradox. This part of the account ends with Tarski with
  future developments warranting their own articles.
<#ifdef TEX>
header-includes:
    - \\usepackage{epigraph}
<#endif>
...

<#define epigraph|\>#1 --- #2>
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
prophet who reportedly said, "The Cretans always lie." We can immediately see
some features of the statement that distract from the puzzle, namely the
references to "The Cretans" and, more subtly, the use of "lie." The first real
engagement with the paradox as more than a trifle appears to have been with
the Megarian philosopher Eubulides.

This engagement has been rehabilitated by @wheeler1983Megarian, who likens
Eubulides to Zeno in marshaling paradoxes to speak to a largely Parmenidian
set of theses. We are not here concerned with these propositions or this
history,^[However, I believe Parmenidian philosophy is well worth studying
from the perspective of a philosophy of logic as a limit case on how much
ontology one can reasonably derive from your semantics. I am sure we will
return to cover this omission in the future.] but will accept Wheeler's broad
characterization that "In any case, most interpretations of Parmenides' poem
take him to have at  least concluded that negation, plurality,  falsehood, and
physical existents with parts can not be real phenomena, and these claims are
what  I take the Megarians to be defending."

## The Way of the Megarian 

With that preamble out of the way, let's look at a presentation of the liar. I
am here reworking Wheeler's presentation, as he prefers a characterization of
a paradox as a set of mutually inconsistent premises. This is a popular
characterization, but one I believe to be deeply problematic.^[The major
deficiency of this characterization is that it is prejudiced against
paraconstistent approaches.] I will instead prefer to say that a paradox is an
apparently sound proof of an apparent falsehood.

(@lem) Every meaningful declarative sentence is either true or false. 
(@nonCon) The sentences "$S$ is true" and "$S$ is false" are mutually exclusive whatever object is put for $S$.
(@predMeaning) The sentences "$S$ is false/true" are meaningful declarative sentences whenever $S$ is a meaningful declarative sentence.
(@selfRef) Self-reference does not bar a sentence from being a meaningful declarative sentence.
(@nonTrivialism) Some meaningful declarative sentence is false.

I will give the proof sketch from these sentences as we will have the occasion
later on to go into much more depth into how exactly this works. The basic
idea is that given these and some other basic assumptions about how "_ is
true", "_ is false" and sentential reference work, we first conclude that

(@liar) $L$ = "$L$ is false"

is a meaningful declarative sentence that is therefore either true or false.
With a bit of manipulation we prove that $L$ is both true and false, but @nonCon
said that could not happen!^[I am again dissatisfied with Wheeler's way of
putting the problem, but it must be remembered that the paper predates serious
dialethic approaches to the liar. The main deficiency is that such approaches
*validate* @lem--@selfRef while still, in my terms, eliminating the paradox---
the original paradox must be much further developed to show how such proposed
solutions are supposed to work.]

The picture is something like this: we started with a number of sentences that
seemed innocent and obviously true, but when we put them together we ended up
somewhere rather different, somewhere we'd rather not be. If we are to get out
of this place, we will have to turn our backs on what got us here. What can
happen though is that we return very much changed, wary and wondering after
the solid ground. This is the basis of a productive use of paradox: from this
state of uncertainty we are willing to reject sentences that we otherwise
considered unassailable. It is this state that Eubulides exploits,
recommending as a balm to our condition the rejection of 'false' as a
meaningful sentential predicate, that is rejection of @nonTrivialism and
@predMeaning.

## The Path Syllogistic

I am going to back up a bit in history and divert us somewhat because we've
entered shaky territory. We have a proof that is both sound and apparently
disastrous and feel we need to give up our certainty in some step of the
proof. We've seen what Eubulides said we should give, but what he says to do
sounds crazy. We want a second opinion, but more than that we want to know
which opinion to trust.

Slightly preceding this problem

# Bibliography