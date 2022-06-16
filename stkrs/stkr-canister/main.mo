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

import T "types";

actor {
  private var stkrEntries: Buffer.Buffer<T.Stkr> = Buffer.Buffer(0);
  private var userToStkr = HashMap.HashMap<Principal, TrieSet.Set<Nat>>(10, Principal.equal, Principal.hash);
  private var userToData = HashMap.HashMap<Principal, T.UserData>(10, Principal.equal, Principal.hash);
  private var userToPins = HashMap.HashMap<Principal, TrieSet.Set<Nat>>(10, Principal.equal, Principal.hash);
  private var userToComments = HashMap.HashMap<Principal, Buffer.Buffer<T.Comment>>(10, Principal.equal, Principal.hash);

  public shared (msg) func createStkr(title: Text, organization: Text, description: Text, category: Text, image: Text): async Nat {
    let s: T.Stkr = {
      id = stkrEntries.size();
      creator = msg.caller;
      title;
      organization;
      description;
      category;
      image;
    };
    stkrEntries.add(s);
    return s.id;
  };

  public shared query func getStkr(stkr: Nat): async T.Stkr {
    assert stkrEntries.size() > stkr;
    return stkrEntries.get(stkr);
  };

  public shared (msg) func sendStkr(stkr: Nat, to: Principal): () {
    assert stkrEntries.size() > stkr;
    assert stkrEntries.get(stkr).creator == msg.caller;

    let stkrs: TrieSet.Set<Nat> = switch (userToStkr.get(to)) {
      case null {
        TrieSet.empty()
      };
      case (?s) s
    };
    assert not TrieSet.mem(stkrs, stkr, Int.hash(stkr), Nat.equal);
    userToStkr.put(to, TrieSet.put(stkrs, stkr, Int.hash(stkr), Nat.equal));
  };

  public shared (msg) func setUser(user: T.UserData): () {
    userToData.put(msg.caller, user);
  };

  public shared query (msg) func getUser(user: ?Principal): async ?T.UserData {
    switch (user) {
      case null userToData.get(msg.caller);
      case (?u) userToData.get(u)
    }
  };

  public shared query (msg) func getStkrs(u: ?Principal): async [T.Stkr] {
    let user: Principal = switch (u) {
      case (null) msg.caller;
      case (?u) u
    };

    let stkrs: TrieSet.Set<Nat> = switch (userToStkr.get(user)) {
      case null TrieSet.empty();
      case (?s) s
    };
    Array.map(TrieSet.toArray(stkrs), stkrEntries.get)
  };

  public shared (msg) func addComment(u: Principal, content: Text): () {
    let comments: Buffer.Buffer<T.Comment> = switch (userToComments.get(u)) {
      case null {
        let b = Buffer.Buffer<T.Comment>(0);
        userToComments.put(u, b);
        b
      };
      case (?c) c
    };
    let c: T.Comment = {
      creator = u;
      content;
      createdAt = Time.now();
    };
    comments.add(c);
  };

  public shared query func getComments(u: Principal): async [T.Comment]  {
    let comments: Buffer.Buffer<T.Comment> = switch (userToComments.get(u)) {
      case null Buffer.Buffer<T.Comment>(0);
      case (?c) c
    };
    comments.toArray()
  };

  public shared (msg) func addPin(stkr: Nat): () {
    assert stkrEntries.size() > stkr;
    let user: Principal = msg.caller;
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

  public shared query (msg) func getPins(u: ?Principal): async [Nat] {
    let user: Principal = switch (u) {
      case null msg.caller;
      case (?u) u
    };
    let pins: TrieSet.Set<Nat> = switch (userToPins.get(user)) {
      case null TrieSet.empty();
      case (?s) s
    };
    TrieSet.toArray(pins)
  };

  public shared (msg) func removePin(stkr: Nat): () {
    assert stkrEntries.size() > stkr;
    let user: Principal = msg.caller;
    let pins: TrieSet.Set<Nat> = switch (userToPins.get(user)) {
      case null TrieSet.empty();
      case (?s) s
    };
    assert TrieSet.mem(pins, stkr, Int.hash(stkr), Nat.equal);
    userToPins.put(user, TrieSet.delete(pins, stkr, Int.hash(stkr), Nat.equal));
  };

  public shared query (msg) func getUsersWStkr(stkr: Nat): async [Principal] {
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
  }
}