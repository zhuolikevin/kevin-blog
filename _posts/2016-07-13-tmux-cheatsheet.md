---
layout: post
title: "Tmux Simple Cheatsheet"
date: 2016-07-13 11:27:00 +0800
permalink: /:categories/:year/:month/:day/:title/
tags: English Techs
---

As the most popular terminal multiplexer, Tmux can highly speed up our daily works. Here I just provide some of the most commonly used commands which you will definately meet again and again.

# Installation

```bash
# We can use Homebrew for the installation
$ brew install tmux
```

# Configuration

The default <prefix> for Tmux is "Ctr + b". However, I would prefer to change this shortcut as "Ctr + a" due to the fairly far distance between the two guys on keyboard.

Add the following lines in `~/.tmux.conf`.

```bash
unbind ^b
set -g prefix 'C-a'
# Add a new shortcut <prefix>r
# which can dynamically reload the configuration file
# without killing Tmux server
bind r source-file ~/.tmux.conf \; display-message "Config reloaded"
```
We will take <prefix> as a substitute of "Ctr + a" in the following texts.

If we want to know the current configuration:

```bash
tmux show -g
```

For those who are fans of Vim, appending these lines in `~/.tmux.conf` will allow you to switch panels with Vim's fantastic `h/j/k/l`.

```bash
setw -g mode-keys vi
# switch panels
bind k selectp -U # switch to panel Up
bind j selectp -D # switch to panel Down
bind h selectp -L # switch to panel Left
bind l selectp -R # switch to panel Right
```

# Shortcuts

## Session

```bash
# Start a new session
$ tmux

# Start a new session with name
$ tmux new -s session_name

# Show all sessions in current tmux server
$ tmux ls

# Switch to specific session
$ tmux a -t session_name

# Temporarily quit a session
$ <prefix> d

# Kill current session
$ <prefix> :kill-session

# Kill all sessions
$ <prefix> :kill-server

# Kill specific session
$ tmux kill-session -t session_name
```

## Window

```bash
# New a window
$ <prefix> c

# Delete a window
$ <prefix> &

# Next window
$ <prefix> n

# Last window
$ <prefix> p

# Rename a window
$ <prefix> ,
```

## Pane

```bash
# Split horizontally
$ <prefix> "
```

```bash
# Split vertically
$ <prefix> %
```

```bash
# Select a pane
$ <prefix> [Directional keys]
```

```bash
# If vim-mode configured (see Configuration above), select a pane like this
$ <prefix> h/j/k/l
```

```bash
# Resize a pane
$ <prefix> :resize-pane -U/D/L/R [size]
```

```bash
# Delete a pane
$ <prefix> x
```

```bash
# Move pane to a specific window
$ <prefix> :join-pane -t window_name
```

```bash
# Show the pane numbers
$ <prefix> q
```

## Others

```bash
# Enter copy-mode.
# Then you can use PageUp/PageDown to scroll the screen.
$ <prefix> [

# Show all the shortcuts list
$ <prefix> ?
```
<br><br>
**References**

- [Tmux Directives](http://baiqiuyi.com/linux/tmux%E5%B8%B8%E7%94%A8%E5%91%BD%E4%BB%A4.html)
- [Use Command Line Gentally](http://harttle.com/2015/11/06/tmux-startup.html)
