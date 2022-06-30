import Principal "mo:base/Principal";
import Nat "mo:base/Nat";
import Int "mo:base/Int";
import TrieSet "mo:base/TrieSet";
import Buffer "mo:base/Buffer";
import HashMap "mo:base/HashMap";
import Hash "mo:base/Hash";
import Array "mo:base/Array";
import Debug "mo:base/Debug";
import Option "mo:base/Option";
import Time "mo:base/Time";
import Iter "mo:base/Iter";

import T "types";

actor {
  private stable var stkrEntries_s: [T.Stkr] = [];
  private stable var userToStkr_s: [(Principal, TrieSet.Set<Nat>)] = [];
  private stable var userToData_s: [(Principal, T.UserData)] = [];
  private stable var userToPins_s: [(Principal, TrieSet.Set<Nat>)] = [];
  private stable var userToComments_s: [(Principal, [T.Comment])] = [];

  private func fromArray<X>(elems: [X]): Buffer.Buffer<X> {
    let buff = Buffer.Buffer<X>(elems.size());
    for (elem in elems.vals()) {
      buff.add(elem)
    };
    buff
  };

  private let stkrEntries: Buffer.Buffer<T.Stkr> = fromArray(stkrEntries_s);
  private let userToStkr = HashMap.fromIter<Principal, TrieSet.Set<Nat>>(userToStkr_s.vals(), 10, Principal.equal, Principal.hash);
  private let userToData = HashMap.fromIter<Principal, T.UserData>(userToData_s.vals(), 10, Principal.equal, Principal.hash);
  private let userToPins = HashMap.fromIter<Principal, TrieSet.Set<Nat>>(userToPins_s.vals(), 10, Principal.equal, Principal.hash);
  private let userToComments = HashMap.fromIter<Principal, [T.Comment]>(userToComments_s.vals(), 10, Principal.equal, Principal.hash);

  system func preupgrade() {
    Debug.print("Starting pre-upgrade hook...");
    stkrEntries_s := stkrEntries.toArray();
    userToStkr_s := Iter.toArray(userToStkr.entries());
    userToData_s := Iter.toArray(userToData.entries());
    userToPins_s := Iter.toArray(userToPins.entries());
    userToComments_s := Iter.toArray(userToComments.entries());
    Debug.print("pre-upgrade finished.");
  };

  system func postupgrade() {
    Debug.print("Starting post-upgrade hook...");
    stkrEntries_s := [];
    userToStkr_s := [];
    userToData_s := [];
    userToPins_s := [];
    userToComments_s := [];
    Debug.print("post-upgrade finished.");
  };

  public shared({ caller }) func createStkr(title: Text, organization: Text, description: Text, category: Text, image: Text): async Nat {
    let s: T.Stkr = {
      id = stkrEntries.size();
      creator = caller;
      title;
      organization;
      description;
      category;
      image;
    };
    stkrEntries.add(s);
    return s.id;
  };

  public shared({ caller }) func editStkr(stkr: Nat, title: Text, organization: Text, description: Text, category: Text, image: Text): () {
    assert stkrEntries.size() > stkr;
    assert stkrEntries.get(stkr).creator == caller;
    let s: T.Stkr = {
      id = stkr;
      creator = caller;
      title;
      organization;
      description;
      category;
      image;
    };

    stkrEntries.put(stkr, s);
  };

  public query func getStkr(stkr: Nat): async T.Stkr {
    assert stkrEntries.size() > stkr;
    return stkrEntries.get(stkr);
  };

  public shared({ caller }) func sendStkr(stkr: Nat, to: Principal): () {
    assert stkrEntries.size() > stkr;
    assert stkrEntries.get(stkr).creator == caller;

    let stkrs: TrieSet.Set<Nat> = switch (userToStkr.get(to)) {
      case null {
        TrieSet.empty()
      };
      case (?s) s
    };
    assert not TrieSet.mem(stkrs, stkr, Int.hash(stkr), Nat.equal);
    userToStkr.put(to, TrieSet.put(stkrs, stkr, Int.hash(stkr), Nat.equal));
  };

  public shared({ caller }) func setUser(user: T.UserData): () {
    userToData.put(caller, user);
  };

  public query({ caller }) func getUser(user: ?Principal): async ?T.UserData {
    switch (user) {
      case null userToData.get(caller);
      case (?u) userToData.get(u)
    }
  };

  public query({ caller }) func getStkrs(u: ?Principal): async [T.Stkr] {
    let user: Principal = switch (u) {
      case (null) caller;
      case (?u) u
    };

    let stkrs: TrieSet.Set<Nat> = switch (userToStkr.get(user)) {
      case null TrieSet.empty();
      case (?s) s
    };
    Array.map(TrieSet.toArray(stkrs), stkrEntries.get)
  };

  public shared({ caller }) func addComment(u: Principal, content: Text): () {
    assert (await getSharedStkrs(caller, u)).size() > 0;
    let comments: Buffer.Buffer<T.Comment> = switch (userToComments.get(u)) {
      case null Buffer.Buffer<T.Comment>(0);
      case (?c) fromArray(c);
    };
    let c: T.Comment = {
      creator = caller;
      content;
      createdAt = Time.now();
    };
    comments.add(c);
    userToComments.put(u, comments.toArray());
  };

  public query func getComments(u: Principal): async [T.Comment]  {
    switch (userToComments.get(u)) {
      case null [];
      case (?c) c
    }
  };

  public shared({ caller }) func addPin(stkr: Nat): () {
    assert stkrEntries.size() > stkr;
    let user: Principal = caller;
    let stkrs = switch (userToStkr.get(user)) {
      case null TrieSet.empty();
      case (?s) s
    };
    assert TrieSet.mem(stkrs, stkr, Int.hash(stkr), Nat.equal);

    let pins: TrieSet.Set<Nat> = switch (userToPins.get(user)) {
      case null TrieSet.empty();
      case (?s) s
    };
    assert not TrieSet.mem(pins, stkr, Int.hash(stkr), Nat.equal);
    userToPins.put(user, TrieSet.put(pins, stkr, Int.hash(stkr), Nat.equal));
  };

  public query({ caller }) func getPins(u: ?Principal): async [Nat] {
    let user: Principal = switch (u) {
      case null caller;
      case (?u) u
    };
    let pins: TrieSet.Set<Nat> = switch (userToPins.get(user)) {
      case null TrieSet.empty();
      case (?s) s
    };
    TrieSet.toArray(pins)
  };

  public shared({ caller }) func removePin(stkr: Nat): () {
    assert stkrEntries.size() > stkr;
    let user: Principal = caller;
    let pins: TrieSet.Set<Nat> = switch (userToPins.get(user)) {
      case null TrieSet.empty();
      case (?s) s
    };
    assert TrieSet.mem(pins, stkr, Int.hash(stkr), Nat.equal);
    userToPins.put(user, TrieSet.delete(pins, stkr, Int.hash(stkr), Nat.equal));
  };

  public query func getUsersWStkr(stkr: Nat): async [Principal] {
    let ret: Buffer.Buffer<Principal> = Buffer.Buffer(0);
    for (key in userToStkr.keys()) {
      let stkrs: TrieSet.Set<Nat> = switch (userToStkr.get(key)) {
        case null TrieSet.empty();
        case (?s) s
      };
      if (TrieSet.mem(stkrs, stkr, Int.hash(stkr), Nat.equal)) {
        ret.add(key);
      }
    };
    ret.toArray()
  };

  public query func getSharedStkrs(u1: Principal, u2: Principal): async [Nat] {
    let u1stkrs = switch (userToStkr.get(u1)) {
      case null TrieSet.empty();
      case (?s) s
    };
    let u2stkrs = switch (userToStkr.get(u2)) {
      case null TrieSet.empty();
      case (?s) s
    };
    TrieSet.toArray(TrieSet.intersect(u1stkrs, u2stkrs, Nat.equal))
  };

  public query func getUsers(): async [(Principal, T.UserData)] {
    Iter.toArray(userToData.entries())
  }
}