# A Self-Taught Course in Automated Reasoning using Haskell

## Variables, Terms, and Syntactic Unification

### Resources

- [_Introduction to Unification Theory_ Lecture 1][itut-1]
- Sections 8.1 and 8.2 of [_The Handbook of Automated Reasoning_][hoar]

### Exercises

1. Define a type `Variable` of metavariables.

   Template: `data Variable = …`
1. Write a type `FOOpenTerm` of first-order open terms (essentially rose trees
   where branches represent functions and leaf nodes represent metavariables
   and constants, and a constant is just a 0-ary function). This type should
   have one type parameter: a type of function symbols.

   Template: `data FOOpenTerm (fun ∷ ⋆) = …`
1. Write a new type `FOTerm` that is like `FOOpenTerm`, but parameterized over
   an arbitrary type of metavariables, so that you can represent closed terms
   by setting the parameter to `Void`.

   Template: `data FOTerm (fun ∷ ⋆) (var ∷ ⋆) = …`
1. Write a new type `HOTerm`, that is like `FOTerm`, but it supports _binder_
   nodes, which can capture variables. Assume that each binder node can only
   capture one variable. The type of binders should be a parameter; for example,
   the lambda calculus would have `data Binder = Lam` as the parameter, whereas
   first-order logic would have `data Binder = ForAll | Exists` as the
   parameter.

   Template: `data HOTerm (fun ∷ ⋆) (var ∷ ⋆) (binder ∷ ⋆) = …`
1. Redefine `FOOpenTerm` and `FOTerm` as type aliases in terms of `HOTerm`.
1. Write a function that computes the set of free variables in an `HOTerm`.

   Template: `freeVars ∷ (Ord v) ⇒ HOTerm f v b → Set v`
1. Implement capture-avoiding substitution of a single variable on `HOTerm`s.

   Template: `subst ∷ (v, HOTerm f v b) → HOTerm f v b → HOTerm f v b`
1. Implement capture-avoiding simultaneous substitution on `HOTerm`s.

   Template: `simulSubst ∷ [(v, HOTerm f v b)] → HOTerm f v b → HOTerm f v b`
1. Write a type `HOSubst` of substitutions in terms of `HOTerm`
   (essentially a partial function from variables to terms).

   Template: `data HOSubst (fun ∷ ⋆) (var ∷ ⋆) (binder ∷ ⋆) = …`
1. Redefine `simulSubst` in terms of your type of substitutions.

   Template: `simulSubst ∷ HOSubst f v b → HOTerm f v b → HOTerm f v b`
1. Define a type alias `FOSubst` of substitutions on first-order terms
   in terms of `HOSubst`.
1. Implement syntactic matching on `FOTerm`s.

   Template: `match ∷ FOTerm f Void → FOTerm f v → Maybe (FOSubst f v)`
1. Implement syntactic unification (using the Robinson algorithm or the
   Martelli-Montanari algorithm) on `FOTerm`s.

   Template: `unify ∷ FOTerm f v → FOTerm f v → Maybe (FOSubst f v)`

## Term-Rewriting Systems

### Resources:

- [_Set Theory and Algebra in Computer Science_ by José Meseguer][stacs]
- [_Term Rewriting And All That_ by Franz Baader and Tobias Nipkow][traat]
- Sections 9.1 through 9.6 of [_The Handbook of Automated Reasoning_][hoar]

### Exercises

1. A _transition system_ is a pair `(S, →)` of a set of _states_ `S` and
   a _transition relation_ `(→) ⊆ S²`. A _labelled_ transition system is a
   triple `(S, Λ, →)` where `(→) ⊆ (S × Λ × S)`.

   A _term-rewriting system_ (TRS) is a transition system whose set of states is
   given by a set of terms, and whose transition relation is given by a set of
   _rewrite rules_, which, for our purposes, will be pairs `p ↦ e` where `p` is
   a _pattern_ (FO open) term and `e` is an _expression_ (FO open) term, and the
   set of free variables in `e` is a subset of the set of free variables in `p`.

   If `(a, b)` is a pair of terms in a TRS, we say that `a` _derives_ `b`
   (denoted `a →* b`) when there exists a finite sequence of rewrites that
   starts at `a` and ends with `b`. In other words, `→*` is the
   reflexive-transitive closure of the `→` relation. Similarly, the transitive
   closure of `→` is denoted by `→⁺`.

   A pair of terms `(a, b)` in a TRS is _joinable_ (denoted `a ↑ b`) iff there
   exists a term `c` such that `a →* c` and `b →* c`.

   A pair of terms `(a, b)` in a TRS is _meetable_ iff there exists a term `c`
   such that `c →* a` and `c →* b`.

   A TRS is _locally confluent_ if for every triple of terms `(a, b, c)`
   such that `a → b` and `a → c`, there exists a term `d` such that
   `b →* d` and `c →* d`.

   A TRS is _confluent_ (or satisfies the _Church-Rosser property_) if for every
   triple of terms `(a, b, c)` such that `a →* b` and `a →* c`, there exists a
   term `d` such that `b →* d` and `c →* d`.

   **Without referring to any outside resources** (spoilers are easy to find),
   come up with a term-rewriting system that is locally confluent but not
   confluent.

   **Extra credit**: come up with a term-rewriting system that has no cycles
   (when thought of as a digraph) that is locally confluent but not confluent.
1. Write a type `Rule f v` for first-order rewrite rules.
1. We can apply a rewrite rule `p ↦ e` to a term `t` by unifying `p` with `t` to
   get a substitution `θ`, and then applying `θ` to `e`.

   Write a function that does this.

   Template: `applyRule ∷ Rule f v → FOTerm f v → Maybe (FOTerm f v)`
1. Write a type `TRS f v` for first-order term-rewriting systems in
   terms of `Rule`. A term-rewriting system cannot contain the same rule twice.
1. Write a type `LTRS f v l` for _labelled_ first-order term-rewriting systems.
   The `l` parameter is for the type of labels.
1. Rewrite `TRS f v` as a type alias for `LTRS f v ()`.
1. Write a function that computes the set of terms that are the result of
   applying a rewrite rule to a given term.

   Template: `oneStepTRS ∷ TRS f v → FOTerm f v → Set (FOTerm f v)`
1. Generalize the `oneStepTRS` function to the `LTRS` type.

   Template: `oneStepLTRS ∷ (Ord f, Ord v) ⇒ LTRS f v l → FOTerm f v → Map (FOTerm f v) l`
1. We can compute the set of terms derivable from a given term in a TRS by doing
   a breadth-first search using `oneStepLTRS`. The search may not terminate so
   the output should be given through a callback. The callback will take the
   current rule (the node in the search tree) and the list of rule labels used
   so far (the path from the root to the current node in the search tree).

   Template: `forDerivable ∷ (Monad m) ⇒ LTRS f v l → FOTerm f v → (FOTerm f v → [l] → m a) → m ()`
1. A _critical pair_ in a term-rewriting system is a pair of terms `(t₁, t₂)`
   such that there exists a term `t` for which two different applications of a
   rewrite rule (either the same rule applied differently, or two different
   rules) yield the terms `t₁` and `t₂`.

   More precisely, to compute the set of critical pairs of a term-rewriting
   system, we do the following for every (not necessarily distinct) pair of
   rules `r₁ = (p₁ ↦ e₁)` and `r₂ = (p₂ ↦ e₂)`:

   - Simultaneously (i.e.: with the same substitution) rename the variables
     in `p₂` and `e₂` so that the set of free variables of `r₂` is disjoint
     from that of `r₁`.
   - For each non-variable subterm `s` in `p₁`, try unifying `s` with `p₂`.
     If unification succeeds, assume it returns a substitution `θ`
     (if it fails, continue on in the loop).

     Denote the application (i.e.: simultaneous substitution) of `θ` to a
     term `t` by `θ(t)`.

     Define `x` to be `θ(e₁)`.
     Define `y` to be the result of replacing every instance of `θ(s)`
     in `θ(p₁)` with `θ(e₂)`.

     Yield the critical pair `(x, y)` and continue the loops.

   Implement this algorithm for the `TRS` type.

   Template: `criticalPairs ∷ TRS f v → Set (FOTerm f v, FOTerm f v)`
1. A critical pair is _convergent_ iff it is joinable. If all the critical pairs
   of a term-rewriting system are convergent, then it is locally confluent.

   Write a program, using `criticalPairs` and `forDerivable`, that automatically
   checks if a given term-rewriting system is locally confluent. Do not worry
   about the efficiency of the algorithm. It should terminate if the given
   term-rewriting system is strongly-normalizing, but it may not if that is not
   the case.

   Template: `isLocallyConfluent ∷ TRS f v → Bool`
1. Implement the Knuth-Bendix completion algorithm, which computes a confluent
   and terminating TRS with the same deductive closure as the input TRS.
   The algorithm may not terminate. Try it on some simple TRSes: a theory with
   only ground terms (no variables), the theory of monoids of size `n`, the
   theory of groups of size `n`.

   Template: `knuthBendix ∷ TRS f v → TRS f v`

## FIXME: future exercises

- Term indexing
  - see chapter 26 of [_The Handbook of Automated Reasoning_][hoar]
  - implement path indexing
  - implement a discrimination tree
  - implement a substitution tree
- Logic programming
  - https://www.cs.cmu.edu/~fp/courses/lp/schedule.html
  - write a type of formulae in Horn logic (sets of Horn clauses)
  - implement a proof procedure for Horn logic (Prolog)
  - implement a proof procedure for hereditary Harrop logic (λProlog)
    ([link](https://jflap.org/techreports/1992/1992-17.ps.gz))
- SAT solvers
  - write the type of formulae in first-order classical logic
    (parameterized on types for relation and function symbols)
  - write a function to convert FO formulae to negation normal form
  - write a function to convert FO formulae to conjunctive normal form
    using the Tseytin transformation
  - write a function to convert FO formulae to skolem normal form
  - write a simple resolution-based theorem prover for first-order
    classical logic
  - write a SAT solver using DPLL
  - write a type of binary decision diagrams
    (and associated functions and tests)
- SMT solvers
  - extend your SAT solver with the quantifier-free theory of
    syntactic equality (using your unification algorithm)
  - extend your SAT solver with the quantifier-free theory of the integers
  - implement Cooper's algorithm for quantifier elimination in
    the theory of the integers
  - implement the Ferrante-Rackoff algorithm for quantifier elimination in
    the theory of the rationals
  - extend your SAT solver with the quantifier-free theory of the rationals
  - implement the Nelson-Oppen method for combining decision procedures
- Intuitionistic type theory
  - implement an interpreter for the untyped lambda calculus
  - implement a typechecker for simply-typed lambda calculus
  - implement a typechecker for System F
  - implement a typechecker for the calculus of constructions
  - implement a typechecker for System F + automatic instantiation
  - implement a typechecker for System F + type class constraints
  - implement a typechecker for System F + quantified class constraints
    ([link](http://homepages.inf.ed.ac.uk/wadler/papers/quantcc/quantcc.pdf))
  - implement a typechecker for System F + row polymorphism
    ([link](http://web.cecs.pdx.edu/~mpj/pubs/96-3.pdf))
  - implement a typechecker for System F + refinement ("liquid") types
    ([link](http://goto.ucsd.edu/~nvazou/refinement_types_for_haskell.pdf))
- Substructural logic
  - implement a proof checker for intuitionistic ordered linear logic
  - implement a proof checker for intuitionistic linear logic
  - implement a proof checker for dual light affine logic
    ([link](https://arxiv.org/pdf/0710.1153.pdf))
  - implement a proof checker for the logic of bunched implications
  - write an automated theorem prover for intuitionistic linear logic
    using the inverse method without focusing
    ([link](https://www.cs.cmu.edu/~fp/papers/csl05.pdf))
  - speed up that theorem prover with focusing as described in the paper
  - write an automated theorem prover for the logic of bunched implications
    using the inverse method without focusing
    ([link](https://people.mpi-sws.org/~neelk/inverse-method-for-bi.pdf))
- Hoare logic
  - all of this is explained in [_The Calculus of Computation_][coc]
  - define a simple imperative language IMP
  - write an interpreter for IMP
  - add `assert` and preconditions and postconditions
    and loop invariant annotations to IMP
  - write a function that computes weakest precondition
    via symbolic execution
  - write a function that computes strongest postcondition
    via symbolic execution
  - write a function that computes a verification condition
    via symbolic execution
  - use SMT solver to automatically verify partial correctness of IMP code
  - add ranking function annotations to IMP
  - use SMT solver to automatically verify total correctness of IMP code
- Separation logic
  - [link](http://www.cs.cmu.edu/~jcr/seplogic.pdf)
  - add heap allocation and separation logic annotations to IMP
  - write a type for formulae in the logic of bunched implications
  - reduce separation logic proof obligations in IMP to formulae in the
    logic of bunched implications
  - extend IMP with concurrency and concurrent separation logic annotations
  - write a proof checker for concurrent separation logic
- Modal logic
  - write a tableaux prover for S4 modal logic
  - express a situation in epistemic logic
  - modal μ-calculus?
- Temporal logic
  - write the type of formulae in linear temporal logic (LTL)
  - write a function to convert LTL formulae to negation normal form
  - write a type of Büchi automata
  - write a function to convert LTL formulae to the associated Büchi automaton
  - write a function for the intersection of Büchi automata
  - write a model checker for LTL (easy once you have done the above)
  - write a type of Kripke structures
  - write a type of formulae in computation tree logic (CTL)
  - write a model checker for CTL
- Abstract interpretation
  - write a function that does interval abstract interpretation on IMP
    as described in section 12.2 of [_The Calculus of Computation_][coc])
  - write a function that bounds the complexity class of IMP code
    using an abstract domain of countable ordinals
    ([link](http://citeseerx.ist.psu.edu/viewdoc/download?doi=10.1.1.696.3611&rep=rep1&type=pdf))
- Higher order logic
  - implement second-order matching
    ([link](https://doi.org/10.1007/BF00264598))
  - implement higher-order matching
    ([link](https://www.sciencedirect.com/science/article/pii/S0304397500004023))
  - implement the (semidecidable and partial) DLS algorithm for reduction of
    second-order logic to first-order logic
    ([link](http://citeseerx.ist.psu.edu/viewdoc/download?doi=10.1.1.30.7292&rep=rep1&type=pdf)).
  - implement (semidecidable) higher order unification via Huet's algorithm
    as described in section 16.4 of [_The Handbook of Automated Reasoning_][hoar].
- Conditional term-rewriting
  - define type of conditional TRSes
  - write algorithm eliminating conditional TRSes into unconditional TRSes
    ([link](http://fsl.cs.illinois.edu/pubs/serbanuta-rosu-2006-rta.pdf)).
- Equational unification
  - write a function to convert formulae in propositional classical logic
    into ring sum normal form
  - write a function to do equational unification in the theory of
    boolean rings
  - implement AC-unification using the algorithm that involves enumerating
    maximal matchings in a bipartite graph
    ([link](https://academic.oup.com/comjnl/article/38/5/381/452052))
  - write a type of non-negative linear diophantine systems
  - reduce AC-unification to solving non-negative linear diophantine systems
  - implement equational/semantic unification (semidecidably) using narrowing
- Termination and cotermination
  - implement a totality checker for STLC + a fixed point combinator using
    guarded recursion ([link](https://bentnib.org/productive.pdf))
- Inductive theorem proving
  - explicit induction?
  - rippling?
  - inductionless (implicit) induction?

## FIXME: notes

### Decidable fragments of FOL

Sources:

- https://logic.rwth-aachen.de/~graedel/kalmar.pdf
- https://doi.org/10.1016/0022-0000%2880%2990027-6

Summary of decidable fragments:

- the monadic predicate calculus
- the prefix class `∃*∀*` (the "Schönfinkel-Bernays class")
- the prefix class `∃*∀∃*` (the "Ackermann class")
- the prefix class `∃*∀²∃*` without equality (the "Gödel class")
- `[∃*∀*,   all, (0)]₌` (Bernays, Schönfinkel 1928)
- `[∃*∀²∃*, all, (0)]` (Gödel 1932, Kalmár 1933, Schütte 1934)
- `[all,    (ω), (ω)]` (Löb 1967, Gurevich 1969)
- `[∃*∀∃*,  all, all]` (Gurevich 1973)
- `[all,    (ω), (1)]₌` (Rabin 1969)
- `[∃*∀∃*,  all, (1)]₌` (Shelah 1977)

<!-- ----------------------------------------------------------------------- -->

[itut]:
  http://www.risc.jku.at/education/courses/ss2014/unification/
[itut-1]:
  http://www.risc.jku.at/education/courses/ss2014/unification/slides/01_Syntactic_Unification_handout.pdf
[traat]:
  https://www21.in.tum.de/~nipkow/TRaAT
[stacs]:
  https://pdfs.semanticscholar.org/d106/6b6de601c1d7d5af25af3f7091bc7ad3ad51.pdf
[coc]:
  https://www.amazon.com/dp/3540741127
[hoar]:
  https://www.amazon.com/dp/0262182238

<!-- ----------------------------------------------------------------------- -->
