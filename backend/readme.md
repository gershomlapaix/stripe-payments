libuv: gives Node.js access to the underlying operating system, file system, networking, and more.

libuv implements "event loop" and "thread pool" which are the main features of node js

Event loop: is for handling easy tasks like executing callbacks and network IO.
Thread pool: is for heavy work like file access or compression
Node.js is written in C++ and Javascript.

Node.js uses single thread

Thread: is a sequence of instructions

Node.js process(initialize the program, execute "top-level" code, require modules, register event callbacks, Start EVENT LOOP)

When some tasks are too heavy to be executed in the event loop, thread pool comes in with its 4 additional threads(completely separate from the main thread).

Now the event loop offloads heavy tasks to the thread pool(this happens automatically behind the scenes)

Some of the heavy(expensive) tasks offloaded to the thread pool are like file system APIs, cryptography, compression, DNS lookups(matching web domains to their corresponding real IP addresses). This prevents the event loop to be blocked in execution.