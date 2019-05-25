---
title: Change, Choice and Inference (Recap, Pt 1.)
bibliography: blogs/2019-5-change-choice-and-inference-1.bib
...

*Published March 24, 2019*

***

> Belief is not the only attitude that is relevant to the cognitive situation of
> inquirers. Inquirers make posits, presumptions, assumptions and
> presuppositions as well. These methodological attitudes may diverge from
> belief in various ways, giving us additional complexity in a representation of
> a doxastic situation. But, I suggested, the cluster of propositional attitudes
> which were grouped together under the label *acceptance* share a common
> structure with belief. [@Stalnaker1984, 99]

A nearby future version of myself is writing a literature review of nonmonotonic
belief revision. To help them out, I am writing brief notes of the various
things I am now reading to that end.

@Rott2001's *Change, Choice and Inference* is a book treating, as the overview
has it, "two new perspectives on the formation and transformation of belief"
(1). These perspectives are two ways of thinking about belief revision. In the
first, *static* perspective, the problem of belief revision is a problem of
taking a certain stock of information, or, perhaps, evidence, which is liable to
be both incomplete and inconsistent, and coming up with a coherent system of
beliefs on top of that. From this point of view, I take it, revising one's
beliefs on the basis of new evidence is fundamentally just taking one's old
evidence, adding the new piece, and redoing the derivation of a complete system.
In the other, *dynamic* view, the main problem of belief revision is one of
reconciling old and new information.

# Doxastic Attitudes

There is the question, prior to all this, of what exactly it is one is revising
when one is revising beliefs. Rott makes a few preliminary remarks. Rott accepts
something like the radical interpretation thought that the point of ascribing
beliefs is to make sense of someone as a rational *agent*, and, further, that
belief-ascriptions are holistic.[^idiolects] Even if this is right, it can
perhaps be factored out of a theory of belief revision, as we can assume a fixed
interpretive context. Beliefs are, at least under one notion, *graded*: one can
believe something with a certain level of confidence. However, there are
propositional attitudes like affirming that are binary rather than graded. Rott
is, in general, interested in these binary, belief-like attitudes that include
perhaps some belief states, but also, for example, default assumptions.

[^idiolects]: One might perhaps think, and I suspect this is right, that we
should take this interpretivist view as at best a theory of belief-ascriptions
of others. And I cannot have a theory of other's beliefs without being already
capable of having them myself (that is to make sense of a person having beliefs
ascribed to them, we must already understand someone---in a first person
sense---as already a believer capable of making ascriptions). In fact, I suspect
Burge is right that the bounds of this view are even more limited. For I
generally don't come to ascribe beliefs to others by interpreting them (not even
subconsciously), but rather because I already speak their language and assume
that they say what they believe. There may be cases (e.g. in learning a new
language or faced with the prospects of radical deception) where we do do
interpretation, but it is not the paradigm case. So I think, for the purposes of
a theory of belief revision, radical interpretation is likely to be a red
herring.

These states are binary rather than graded, but they are also more or less
entrenched. Consider two beliefs, each of which have a high degree of confidence
(enough to make one comfortable with asserting them) but with very different
amounts of corresponding evidence. If push came to shove and one had to,
rationally speaking give one up, one would give up the one with the worse
evidential standing. (Degrees of entrenchment, Rott will go on to claim, are
like revealed preferences: what it is for a state to be more entrenched than
another is that the latter is given up first when there is a choice between
them.) Rott thinks that the distinction between beliefs and default assumptions
(and other provisional attitudes) comes down to a contextually determined
difference in entrenchment (beliefs are more entrenched than default
assumptions).

There is a brief discussion of doxastic voluntarism (17), where Rott maintains,
I think plausibly, that while certain doxastic attitudes are not under our
control (I suspect degrees of confidence are like this) we still have the power
to suspend acceptance (that is, we have the power to think *I just don't have
good enough evidence to support this claim*). Besides, even if we don't have
voluntary control of our beliefs or certain acceptance states, we can still use
the language of choice in speaking about belief revision.

So far, so fair. We now get on to a bit of formal stuff. We want to represent
people's beliefs (acceptance states). Rott takes it, and this is again
plausible, that we should start with a representation of *belief bases*. We may
think of belief bases as containing basic, underived beliefs. As Rott (23) puts it.

> (**Maxim B**) The elements of a base are explicitly given beliefs. They
> comprise beliefs, and only beliefs, which have some kind of independent
> standing, i.e., which are not derived by processes of inference from other
> beliefs. They serve as a basis or foundation of the belief set that can be
> 'built on' the base.

What is built on the base is a *theory*, a logically closed, consistent set of
sentences. The theory is what can be inferred from the base, where this is
different than the logical consequences of a base. Here, Rott assumes that the
appropriate logical consequence relation is at least consequence in classical
logic.

# Inference

So what's this *inference* relation. Well, Rott takes a common line here. Your
belief base is probably inconsistent. So you can't just take its consequences.
What you do is first make it consistent; this is called *consolidation*. (One
way of representing this is to think that in consolidating you are "contracting
by $\bot$", where to contract by a sentence is to remove what is inconsistent
with that sentence.) Once you've consolidated, then you can just take the
logical consequence. How do you consolidate, or contract? Rott forgoes one
common approach (the AGM approach) of giving a general or axiomatic treatment
and rather offers a simple definition. The basic concept is this: in contracting
a base by a sentence you remove as little as possible so that the base does not
include or logically imply that sentence. How do you know you've removed as
little as possible? Well, it's that if you put any of the removed beliefs back
in, the result would again imply that sentence. (Contracting by a sentence not
implied by a base either does nothing or is undefined.) Note that this is not a
singly defined operation: more than one resulting sets are going to fulfill this
description.

As noted, in belief base we have more or less firmly held states (beliefs vs.
assumptions). These are represented by a *priority* relation (where this is
related, but prior to, an entrenchment relation; differing in that priority
relations hold between elements of a base and have no logical constraints while
entrenchment relations hold in a theory and are constrained by logic). We
represent a priority relation in the following way: take the sentences in the
base, call them $\mathcal{H}$. Divide $\mathcal{H}$ into indexed, not
necessarily disjoint subsets $\mathcal{H} = \langle H_1, H_2, \ldots,
H_n\rangle$. Now say that for $\phi, \psi \in \mathcal{H}$, $\phi \prec \psi$
just in case there are $i < j$ such that $\phi \in H_i$ and $\psi \in H_j$.
Note, this makes $\prec$ a weak ordering (it is not anti-reflexive).

This gives us a better treatment of contraction, though the basic idea is the
same. To contract by a sentence, first start with the most prioritized sentences
(those with the highest priority index). Take a maximal subset of those not
implying those sentences. Go down a priority level. Add one as many as you can
without implying the sentence. Continue on to the first level. This will get you
contractions with the desired property (maximal without implying the contracted
sentence) which get in as much prioritized stuff as possible. You preserve the
indexes as you go, which gets you a type-match in input and output.

# Conclusion

That's the gist of the first chapter. The approach on its face is plausible
enough. I'm not yet sure what to think of priority and entrenchment (I suspect
they have something to do with justification, but it's unclear).

# References