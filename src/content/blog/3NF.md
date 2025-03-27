---
title: "3NF is Dead - Long Live non-normalized?"
date: "2020-03-03"
author: "toby balsley" 
slug: "3NF"
author: "Toby Balsley"
featuredImg: "/images/button.jpg"
categories: ["just-thinking", "technology", "data-architecture"]
---
# 3NF and the world accoring to COD 
E.F. Codd (1923-2003), the grand architect of relational databases, designed Third Normal Form (3NF) as a way to keep data clean, structured, and free from redundancy. It was the gold standard for database normalization in an era when storage was expensive, queries were transactional, and CPUs weren’t handling billions of reads per second.

*Codd’s 1970's vision* was to solve two fundamental problems in early database design:

    - Avoid Redundant Data – Because storing the same data multiple times leads to inconsistency.

    - Avoid Anomalies – Because inserting, updating, or deleting a row should not break the entire system.

But that world did not come to be. And where it was deployed, it introduced NEW issues that bow needed to be solved.  These issues took decades to wrap our heads around (E.G. Bill Inmon had one method for DW's and Ralph Kimball solved it another).  Even by 2005 Very few real live 3NF database were active - and certialy NOT wtih Referencial Integrety (Database RI) turned on.

But is still is lives on today in pockets.

So while 3NF (Third Normal Form) isn’t exactly *dead*, it ( in modern applications—especially in cloud-based, high-traffic, distributed systems) has largely been *outpaced* by more flexible, performance-driven database strategies. Here’s why:

### **1. Denormalization for Performance**
   - 3NF reduces redundancy, which is great for storage efficiency but terrible for read performance.
   - Modern applications prioritize fast reads (denormalized, cached, indexed), which is the opposite of strict normalization.
   - NoSQL and modern relational databases often *intentionally* store redundant data to reduce expensive joins.

### **2. Distributed Databases (Sharding & Replication)**
   - 3NF assumes a single-node, relational DB. Modern apps scale horizontally, distributing data across nodes.
   - Joins across shards are slow and painful.
   - Systems like DynamoDB, Firebase Firestore, and even modern PostgreSQL setups favor document-oriented, JSON, or key-value storage.

### **3. JSON & NoSQL**
   - JSON databases (MongoDB, Firebase, etc.) allow nesting, which prevents the need for joins.
   - Even relational DBs (Postgres, MySQL) support JSON columns, allowing semi-structured data storage without 3NF.

### **4. Disk Space is Cheap, CPU is Expensive**
   - 3NF was designed when storage was expensive. That’s not the bottleneck anymore—*CPU cycles and query latency are*.
   - Redundant, precomputed data makes reads faster, reducing CPU time spent on joins.
   - For every $100  you spend in the cloud, CPU is $80 - $90. JOINS EAT CPU for LUNCH (becuase of data normalization -- 1st ,2nd, 3rd, 4th, 5th, or a Star).
   - Disk Space in on a path to be free.  FREE.


### **5. CQRS & Event Sourcing Models**
   - Command Query Responsibility Segregation (CQRS) separates read and write models, often requiring denormalized views for reads.
   - Event sourcing stores changes as immutable events, reconstructing state when needed—different from normalized relational storage.

### **6. Real-World Trade-Offs**
   - Many apps end up with *hybrid* approaches: core transactional data might be in 3NF-LIKE becuase if forced thinking of integrery of the data.  
   - But read-heavy data (like user profiles, dashboards, etc.) is often denormalized.
   - But even in DB normalizization, we should NEVER allow the database to fail becuase of integrety issues.  This is a codeing middle ware problem - closer to the user so we can fail and interact with the user.
   - Search systems (like Elasticsearch) are often *indexed denormalized copies* of structured data.

### **Does 3NF Still Have a Place?**
Yes, but it’s mostly in:
   
   - **OLTP (Transactional Systems)**: Banking, ERP, enterprise-grade applications that require high integrity. But even then, we should  NEVER NEVER NEVER should turn on the ingetrey at the database level.  The errors of inserting / updated / deleting with a bad foreign key should be handeled with more modern patterns (your code or abstraction layer should own that responiblity - guided by the 3NF rules).
   - **Legacy Systems**: Apps built around strict relational models.
   - **Data Warehouses**: Though even these of the 2000-2020's use star/snowflake schemas (which are *not* strict 3NF).  Modern (2020+) Data Warehouse and now lakes tend to lean more on the performance benifites so long as the integrety of the data is managed (often with dedicated unknown dimensional).


### **The Direction?**
   - **Normalization Excersizes**: The excersizes are excelent and describing and resoloving data issues and buisness problems.
   - **Virual Normalization and Abstraction**.  It will live in the data rules.  It will live in how we enforce good data.
   - **Normalization Documenation**.  It is STILL a great tool to find disctinctness.  To find the rules (conceptual models), of how this do and should work.  
   
 
### **The Verdict?**
3NF isn’t *dead*, but it’s been shoved into a niche places for performance reasons, and horrible flexibility capabilities. Modern applications prioritize speed, scalability, flexiblity, and availability over theoretical purity. 

If you're still using 3NF everywhere, you're probably having issues that are 2000's legacy issues that dont need to be solved.