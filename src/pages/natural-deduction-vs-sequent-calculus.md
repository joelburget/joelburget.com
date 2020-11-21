Via Wikipedia:

> In natural deduction the flow of information is bi-directional: elimination rules flow information downwards by deconstruction, and introduction rules flow information upwards by assembly. Thus, a natural deduction proof does not have a purely bottom-up or top-down reading, making it unsuitable for automation in proof search.

> In the sequent calculus all inference rules have a purely bottom-up reading.

> The introduction rules of natural deduction are viewed as right rules in the sequent calculus, and are structurally very similar. The elimination rules on the other hand turn into left rules in the sequent calculus.

Via [Pfenning notes](https://www.cs.cmu.edu/~fp/courses/atp/handouts/ch3-seqcalc.pdf):

> A simple strategy in the search for a natural deduction is to use introduction
rules reasoning bottom-up (from the proposed theorem towards the hypotheses)
and the elimination rules top-down (from the assumptions towards the proposed
theorem). When they meet in the middle we have found a normal deduction

[Wren on reddit](https://www.reddit.com/r/haskell/comments/tzp7f/a_gamified_tutorial_on_the_sequent_calculus/c4r6p4b/):

> You do know they're essentially the same, right? Sequent calculus just uses some extra syntax to ensure well-formedness of natural deduction proofs (namely that assumptions are discharged appropriately and not used after being discharged). I've always found sequent calculus a lot easier to understand and to teach because it doesn't rely on meta-theoretic notions of well-formedness or metavariables to capture "any proof goes in here". With sequent calculus the rules tell the whole story.

[Noam Zeilberger](https://mathoverflow.net/a/29688):

> Gentzen's original motivation for introducing sequent calculus was as a tool for studying _provability_, and natural deduction as a tool for studying _proofs_.

Also, from his thesis:

> An old and celebrated analogy says that writing programs is like proving theorems. This analogy has been productive in both directions, but in particular has demonstrated remarkable utility in driving progress in programming languages, for example leading towards a better understanding of concepts such as abstract data types and polymorphism. One of the best known instances of the analogy actually rises to the level of an isomorphism: between Gentzen’s natural deduction and Church’s lambda calculus. However, as has been recognized for a while, lambda calculus fails to capture some of the important features of modern programming languages. Notably, it does not have an inherent notion of evaluation order, needed to make sense of programs with side effects. Instead, the historical descendents of lambda calculus (languages like Lisp, ML, Haskell, etc.) impose evaluation order in an ad hoc way.

Zena Ariola et al ([Sequent Calculi and Abstract Machines](https://www.cs.indiana.edu/~sabry/papers/sequent.pdf))

> Although languages based on lambda-calculi have been successful in supporting
reasoning about high-level programs, in this paper we focus on sequent calculi. We
show that sequent calculi are more suitable for reasoning about abstract machines
since they allow one to define an evaluator for terms in a tail-recursive fashion,
thus satisfying the above criterion. A tail-recursive evaluator captures the dispatch
function carried out by a machine. In contrast, an evaluator for terms corresponding
to natural deduction proofs is not tail recursive, requiring an unbounded search for
the next redex.

> To know the active assumptions at any point in the proof, one needs to travel
up the tree to the leaves. To remedy this, we present natural deduction in sequent
form.

> No longer must we work with open (or closed) assumptions at the leaves of the proof tree; instead, the leaves contain an instance of an axiom in the inference system, and assumptions are internalized into the antecedents of the sequents. Therefore, to know the current collection of active assumptions, one simply looks at the left-hand side of the sequent.

https://github.com/clayrat/sequent-calc-talk
